@Library('my-jenkins-shared') _

def modules = [:]
pipeline {
  agent {
    label 'master' // test-1
  }

  environment {
    NVM_DIR = "${HOME}/.nvm"
    NVM_LOAD = ". ~/.bashrc > /dev/null; set -ex; nvm use 12;"
  }

  stages {
    stage('nvm info') {
      steps {
        echo "NVM lies in ${NVM_DIR}"

        script {
          telegramSend(message: 'Hello World', chatId: 608276470)
        }

        sh """
          set -ex;
          . ~/.bashrc;

          node --version;
          npm --version;
          nvm --version;
          """
      }
    }

    stage('init') {
      steps {
        script {
          sh """
            ${NVM_LOAD}
            npm install;
          """
        }
      }
    }

    stage('test') {
      steps {
        script {
          sh """
            ${NVM_LOAD}
            npm run test;
          """
        }
      }
    }

    // stage('pre-release') {
    //   when {
    //     anyOf {
    //       branch 'master';
    //       branch 'develop';
    //     }
    //   }
    //   steps {
    //     script {
    //       env.COMMIT_MESSAGE = GitLastCommitMessage()
    //     }
    //     sh "echo \"Commit Message: ${env.COMMIT_MESSAGE}\""
    //   }
    // }

    stage('release') {
      when {
        branch 'develop';
      }
      steps {
        NpmRelease(releaseArgs = '--preRelease=dev', credentialsId = '52e756f6-5625-41fb-bde9-ead983f84629')

        // sh "echo \"Commit Message: [${env.COMMIT_MESSAGE}]\""
        // script {
        //   RELEASE_ARGS = (env.BRANCH_NAME == 'master' ? params.RELEASE_INC_ARGS : params.RELEASE_INC_ARGS_DEVELOP) + ' --no-git.requireUpstream --git.commitArgs=--no-verify'
        //   if (env.COMMIT_MESSAGE.indexOf("chore: release v") < 0) {
        //     powershell "pwsh.exe -Command \"git remote rm origin\""
        //     withCredentials([usernamePassword(credentialsId: '895edd2d-ee2b-42e7-857c-3f20fbe91073', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
        //       powershell "pwsh.exe -Command \"git remote add origin https://${GIT_USER}:${GIT_TOKEN}@gitlab-forensic.cellebrite.com/pe-exploit-server/exploit-server-web-interface.git\""
        //     }
        //     powershell "pwsh.exe -Command \"git fetch\""
        //     powershell "pwsh.exe -Command \"git checkout .\""
        //     powershell "pwsh.exe -Command \"git checkout ${BRANCH_NAME}\""
        //     powershell "pwsh.exe -Command \"git pull origin ${BRANCH_NAME}\""
        //     powershell "pwsh.exe -Command \"git checkout .\""
        //     powershell "pwsh.exe -Command \"git status\""
        //     powershell "pwsh.exe -Command \"npx yarn install\""
        //     powershell "pwsh.exe -Command \"npx yarn run release -- ${RELEASE_ARGS}\""
        //     powershell "pwsh.exe -Command \"npm publish\""
        //   }
        // }
      }
    }
  }
  post {
    // https://www.jenkins.io/doc/pipeline/tour/post/
    // https://plugins.jenkins.io/telegram-notifications/
    failure {
      // withCredentials([
      //   string(credentialsId: 'jk_pipeline_report_to_email', variable: 'TO_EMAIL')
      // ]) {
      //   mail to: "${TO_EMAIL}",
      //       subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
      //       body: "Something is wrong with ${env.BUILD_URL}"
      // }

      withCredentials([
        string(credentialsId: 'jk_pipeline_report_to_telegram_token', variable: 'TL_TOKEN'),
        string(credentialsId: 'jk_pipeline_report_to_telegram_chatId', variable: 'TL_CHAT_ID')
      ]) {
        TelegramSendStatusFail(TL_TOKEN, TL_CHAT_ID)
      }
    }
    success {
      script {
        // withCredentials([
        //   string(credentialsId: 'jk_pipeline_report_to_email', variable: 'TO_EMAIL')
        // ]) {
        //   mail to: "${TO_EMAIL}",
        //       subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
        //       body: "Build finished with success: ${env.BUILD_URL}"
        // }

        withCredentials([
          string(credentialsId: 'jk_pipeline_report_to_telegram_token', variable: 'TL_TOKEN'),
          string(credentialsId: 'jk_pipeline_report_to_telegram_chatId', variable: 'TL_CHAT_ID')
        ]) {
          TelegramSendStatusOK(TL_TOKEN, TL_CHAT_ID)
        }
      }
    }
  }
}

def testing(def lang, def lint, def test) {
  sh """
    . ~/.bashrc > /dev/null;
    set -ex;
    for version in 11 12 13 14 15; do \\
      nvm use \$version; \\
      bash ./.scripts/travis-test.sh ${lang} ${lint} ${test}; \\
    done
    """
}
