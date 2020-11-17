const electron = require('electron');
const path = require('path'); 
const url = require('url');

// Env 
process.env.NODE_ENV = 'development'; 

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

//LISTEN TO APP REDY 
app.on('ready', function(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes:true
    }));

    //close all window 
    mainWindow.on('closed', function(){
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // inser menu
    Menu.setApplicationMenu(mainMenu);
});

//item window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height:200,
        title:'project speacker'
    });
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file',
        slashes:true
    }));
    addWindow.on('closed', function(){
        addWindow = null;

    });
}   

ipcMain.on('item:add', function(e, item){
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});

const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();

                }
            },
            {
                label:'clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');

                }
            },
            {
                label: 'Quit',
                accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit()
                }
            }

        ]
    }
];

// developer 

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator:process.platform == 'darwin' ? 'command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}



  


