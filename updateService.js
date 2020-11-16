const express = require('express')
const app = express()
const { spawn } = require('child_process');
app.post('/newChatPush', function (req, res) {
    gitPull(res)
   
})
 

function gitPull(res){
    const git = spawn('git', ['pull']);
    
    git.stdout.on('data', (data) => {
        pm2Restart(res)
        data= data.toString()
        console.log(`git stdout: ${data}`);
    });
    
    git.stderr.on('data', (data) => {

        data= data.toString() 
        console.error(`git stderr: ${data}`);
    });
    
    git.on('close', (code) => {
        console.log(`git child process exited with code ${code}`);
    });
}

function pm2Restart(res){
    const pm2 = spawn('pm2', ['restart','all']);
    
    pm2.stdout.on('data', (data) => {
        data= data.toString()
        res.send('Ok '+ data)
      console.log(`pm2 stdout: ${data}`);
    });
    
    pm2.stderr.on('data', (data) => {
        data= data.toString()
        res.send('Error '+ data)
      console.error(`pm2 stderr: ${data}`);
    });
    
    pm2.on('close', (code) => {
      console.log(`pm2 child process exited with code ${code}`);
    });
}

app.listen(1913)