
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJPACpm-uY0OfDIwWeotrXhsawKTNPbqk",
  authDomain: "ash-bot-login-form.firebaseapp.com",
  projectId: "ash-bot-login-form",
  storageBucket: "ash-bot-login-form.firebasestorage.app",
  messagingSenderId: "470812864379",
  appId: "1:470812864379:web:63d27c9211d82f5e6b97de",
  measurementId: "G-PE222N4TQ0",
};

initializeApp(firebaseConfig);

const auth = getAuth();

let username;
let user;




let messagesDiv = document.querySelector(".message-div")
      let sendBtn = document.getElementById("send-btn");
      let container = document.querySelector(".starter");
      let heading = document.querySelector(".heading");
      let messagesContainer = document.getElementById("messages");
      let userInput = document.getElementById("userInput");

      let body = document.querySelector("body");
      let wholeHistory = JSON.parse(localStorage.getItem("Chats") || "[]");

userInput.addEventListener('input', ()=>{
  if (userInput.value.trim() != "") {
          sendBtn.disabled = false;
        }else{
          sendBtn.disabled = true
          return
        }
})




      body.addEventListener("keypress", (event) => {
        if (event.key === "Enter" ) {
          event.preventDefault();
          sendRequest();
        }
      });

      userInput.addEventListener("input", function () {
        userInput.style.height = "auto";
        userInput.style.height =
          (this.scrollHeight > 150 ? 150 : this.scrollHeight) + "px";
      });


      window.addEventListener("load", () => {
  container.classList.add("container");
  container.classList.remove("wrapper");

  const messages = JSON.parse(localStorage.getItem("Chats") || "[]");
  messagesDiv.scrollTop = messagesDiv.scrollHeight
  messagesContainer.scrollTop = messagesContainer.scrollHeight
onAuthStateChanged(auth, (user) => {
  if (user) {
   
    document.querySelector("#login").style.display = "none";
    document.querySelector("#signup").style.display = "none";
    username = user.displayName;
    user = user; 

  if ( messages && messages.length > 0) {
    heading.classList.add("hide");
          container.classList.add("wrapper");
          container.classList.remove("container");
  messages.forEach((message) => {
        if (message.sender === "AI") { 
          let botMessageDiv = document.createElement("div");
            botMessageDiv.classList.add("bot-response-wrapper");
            const botImg = document.createElement("img");
            botImg.classList.add("bot-img");
            botImg.src = "https://i.ibb.co/n3dCLzP/images-removebg-preview-1.png";

            const botResponseSpan = document.createElement("span");
            botResponseSpan.classList.add("bot-response-span");
            botResponseSpan.textContent = message.message
            botMessageDiv.append(botImg);
            botMessageDiv.append(botResponseSpan);
            messagesContainer.append(botMessageDiv)
        } else {  
          let userMessageSpan = document.createElement("span");
            userMessageSpan.classList.add("user-message-span");
            userMessageSpan.textContent = message.message

            messagesContainer.appendChild(userMessageSpan);
        }
      })}
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      messagesContainer.scrollTop = messagesContainer.scrollHeight

    }else{
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    document.querySelector("#login").style.display = "flex";
    document.querySelector("#signup").style.display = "flex";
    }
    });
  
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  messagesContainer.scrollTop = messagesContainer.scrollHeight
});


let isProcessing = false; 

if(isProcessing){
  sendBtn.style.backgroundColor = "#676767"
}


      function sendRequest() {

        if (isProcessing) return; 

        isProcessing = true;

        sendBtn.disabled = true;

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        messagesContainer.scrollTop = messagesContainer.scrollHeight
        let thinkingDiv = document.querySelector(".thinking-div");

        let userMessageSpan = document.createElement("span");
        userMessageSpan.classList.add("user-message-span");

        if (userInput.value.trim() == "") {
          isProcessing = false;
          sendBtn.disabled = true;
          return;
        } else {
          heading.classList.add("hide");
          container.classList.add("wrapper");
          container.classList.remove("container");

          userMessageSpan.textContent = userInput.value;

          const userMessageObject = {
      sender: username,  
      message: userMessageSpan.textContent  
    };

    wholeHistory.push(userMessageObject)
    localStorage.setItem("Chats", JSON.stringify(wholeHistory));  
          messagesContainer.append(userMessageSpan);


          let botResponseWrapper = document.createElement("div");
          botResponseWrapper.classList.add("bot-response-wrapper");

          let botImg = document.createElement("img");
          botImg.classList.add("bot-img");
          botImg.src =
            "https://i.ibb.co/n3dCLzP/images-removebg-preview-1.png";
          botResponseWrapper.appendChild(botImg);
      

        }
       
        userInput.value = "";

        fetch("/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: userMessageSpan.textContent,
            history: wholeHistory,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            let botResponseWrapper = document.createElement("div");
            botResponseWrapper.classList.add("bot-response-wrapper");

            let botImg = document.createElement("img");
            botImg.classList.add("bot-img");
            botImg.src =
              "https://i.ibb.co/n3dCLzP/images-removebg-preview-1.png";
            botResponseWrapper.appendChild(botImg);

            let botResponseSpan = document.createElement("span");
            botResponseSpan.classList.add("bot-response-span");
            botResponseSpan.textContent = ""; 


            botResponseWrapper.append(botResponseSpan);
            messagesContainer.append(botResponseWrapper);

  
            let botMessageObject = {
        sender: "AI",  
        message: data.result
      };
      wholeHistory.push(botMessageObject)
            localStorage.setItem("Chats", JSON.stringify(wholeHistory))
    let index = 0
            const typeCharacter = () => {
              if (index < data.result.length) {
                botResponseSpan.textContent += data.result[index]; 
                index++;
            
                messagesDiv.scrollTop = messagesDiv.scrollHeight; 
                messagesContainer.scrollTop = messagesContainer.scrollHeight
              
                setTimeout(typeCharacter, 25); 
              } else {
                isProcessing = false;
                sendBtn.disabled = false; 
              }
            };
            
            typeCharacter();
      
        
          })
          .catch((error) => {
            console.error(error);
            sendBtn.disabled = false; 
            isProcessing = false;
          });
      }
    
          
          
    
      