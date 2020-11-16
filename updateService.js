const express = require('express')
const app = express()
const { spawn } = require('child_process');
app.post('/newChatPush', function (req, res) {
    gitPull(res)
   
})
 

function gitPull(res){
    const git = spawn('git', ['pull']);
    
    git.stdout.on('data', (data) => {
        data= data.toString()
        console.log(`git stdout: ${data}`);
    });
    
    git.stderr.on('data', (data) => {
        data= data.toString() 
        console.error(`git stderr: ${data}`);
    });
    
    git.on('close', (code) => {
	npmInstall(res)
        console.log(`git child process exited with code ${code}`);
    });
}

function npmInstall(res){
    const npm = spawn('npm', ['install']);
    npm.stdout.on('data', (data) => {
        data= data.toString()
        console.log(`npm stdout: ${data}`);
    });
    
    npm.stderr.on('data', (data) => {

        data= data.toString() 
        console.error(`npm stderr: ${data}`);
    });
    
    npm.on('close', (code) => {
	pm2Restart(res)
        console.log(`npm child process exited with code ${code}`);
    });
}

function pm2Restart(res){
    const pm2 = spawn('pm2', ['restart','all']);
    
    pm2.stdout.on('data', (data) => {
        data= data.toString()
      console.log(`pm2 stdout: ${data}`);
    });
    
    pm2.stderr.on('data', (data) => {
        data= data.toString()
        try{
            res.send('Error '+ data)
        }catch(e){

        }
      console.error(`pm2 stderr: ${data}`);
    });
    
    pm2.on('close', (code) => {
	res.send('pm2 status code: '+code)
      console.log(`pm2 child process exited with code ${code}`);
    });
}

app.listen(1913)
