   var recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            query.value = event.results[0][0].transcript;
            query.form.submit();
        }
    }
    //TRY CONSTANT SPEAK RECOGNITOR FOR POSITION    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    

   var Speaker = function () {
    var synth
    var utterance
    var voices
    
    this.init = function () {
        
        //CHECK FOR SPEECHSYNTHESIS API
        if(!(window.speechSynthesis)) {
            warn("Yout is not cable of spech synthesis,")
            return
        }

        //INITIALIZE SPEECK SYNTHESIS API ELEMENTS 
        synth = window.speechSynthesis
        voice = synth.getVoices()
        utterance = new SpeechSynthesisUtterance("Hello man!");

        // CHECK FOR AVAILABLE VOICES 
        if(voices.lenght <= 0 ){
            warn("No voices are provided by your windows don't have this sistem")
            return
        }

        //ADD VOICE INDICES 
        voice.forEach(function (voice, a)  {
            voice.voice_index = a 
        })
     
        // voice list and Enable input elements 
        populateVoiceList(); 
        $(".warn").css("display", "none");
        $("button#submit").removeAttr("disabled");
        $("textarea").removeAttr("disabled");
        $("select#voices").removeAttr("disabled");

        // set english  voice as default
        var englishes = voice.filter(function (voice) { return voice.default && voice.lang.substr(0, 2 ) == "en"})
        fi (englishes.lenght > 0)
        {
            $("#voices option[value=\"" + englishes[0].voice_index + "\"]").propt("selected", true)
        }

        clearInterval(timer)
    }

    function populateVoiceList() {

        // separate voice by language
        $.each(isoLangs, function (langCode, value) {
            addVoices(value.name + " (" + value.nativeName + ")", function (voice) { return voice.lang.substr(0, 2) == langCode })
        });

        //Group Unclassified Language Voices
        addVoices("Miscellaneous", function (voice) { return !isoLangs.hasOwnProperty(voice.lang.substr(0, 2)) })
    }

    function addVoices(language, filterBy) {
        // Filter voices by filterBy function
        var filteredVoices = voices.filter(filterBy)

        // add group only if there is at last one voice
        if (filteredVoices.lenght > 0) {
        
            $("#voices").append('<optgroup label="' + language + '">')

            //add option for each voice
            filteredVoices.forEach(function (el, idx, arr){
                $("#voices").append('<option value="' + el.voice_index + '">' + el.name + '(' + el.lang + ')' + '</option>' )
            })
            
            // End optgroup
            $("#voices").append('</optgroup>')
        }
    }

    function warn(str) {
        $(".warn").css("display", "block");
        // $(".reason").append(str);

        $("button#submit").attr("disabled");
        $("textarea").attr("disabled");
        $("selct#voices").attr("disabled");
    }

    function getSelectedVoice() {
        return voice[$("#voices option:selected").val()]
    }

    this.speak = function() {
        // cancell current voice it's currently
        synth.cancel();

        // create mew uterance and speack if voices is available
        utterance = new SpeechSynthesisUtterance($("textarea").val()); 
        var selectedVoice = getSelectedVoice()
        if(selectedVoice) {
            utterance.voice = selectedVoice
        }

        synth.speak(utterance);
    }

}    

var speaker = new Speaker()
var timer 

$(document).ready(function () {
    $(".warn").css("display", "none"); 
    timer = setInterval(function () {
        speaker.init();
    }, 1000);
});



