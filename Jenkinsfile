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

    // stage('init') {
    //   steps {
    //     script {
    //       sh """
    //         ${NVM_LOAD}
    //         npm install;
    //       """
    //     }
    //   }
    // }

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

    stage('pre-release') {
      when {
        anyOf {
          branch 'master';
          branch 'develop';
        }
      }
      steps {
        script {
          env.COMMIT_MESSAGE = GitLastCommitMessage()
        }
        sh "echo \"Commit Message: ${env.COMMIT_MESSAGE}\""
      }
    }

    stage('release') {
      when {
        branch 'master';
      }
      steps {
        NodeRelease(
          '52e756f6-5625-41fb-bde9-ead983f84629',
          '83811fdb-744b-45ab-acdb-54ab3baf50b5',
          [
            preRun: env.NVM_LOAD
          ]
        )
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

      TelegramSendStatusFail('jk_pipeline_report_to_telegram_token','jk_pipeline_report_to_telegram_chatId')
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

      TelegramSendStatusOK('jk_pipeline_report_to_telegram_token','jk_pipeline_report_to_telegram_chatId')
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
