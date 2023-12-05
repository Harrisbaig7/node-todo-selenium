pipeline {
    agent {
        docker {
            image 'timbru31/node-alpine-firefox'
            args '-u root:root'
        }
    }
    stages {
        stage('Build') { 
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Harrisbaig7/node-todo-selenium.git']])
                sh 'npm install'
            }
        }
        stage('Test') { 
            steps {
                sh 'npm install pm2 --location=global'
                sh 'pm2 start npm -- start'
                sh 'ls -l'
                sh 'wget https://github.com/mozilla/geckodriver/releases/download/v0.31.0/geckodriver-v0.31.0-linux64.tar.gz'
                sh 'tar -xvzf geckodriver*'
                sh 'chmod +x geckodriver'
                sh 'mv geckodriver /usr/local/bin/'
                sleep(time:5,unit:"SECONDS")
                sh 'pm2 log --nostream npm'
                sh 'wget --spider http://localhost:3000'
                sh 'node test.js'
            }
        }
    }
}
