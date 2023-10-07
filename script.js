const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatBotToggler = document.querySelector(".chatbot-toggler")
const chatBotCloseBtn = document.querySelector(".close-btn");


let userMessage = chatInput;
// const API_KEY = "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";//ritapi
// const API_KEY = "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";//ritapi
const API_KEY = "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";//ritapi



const createChatLi = (message, className) => {
    // creates chat list element with passed message and classname
    const chatLi = document.createElement('li');
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing"? `<p></p>`:` <span class="material-symbols-outlined">smart_toy</span><p></p>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}



    const generateResponse = (incomingChatLi) => {
        const API_URL = "https://api.openai.com/v1/chat/completions"
        const messageElement = incomingChatLi.querySelector("p");

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: userMessage}],
            })

        }

        fetch(API_URL,requestOptions).then(res => res.json()).then(data=>{
            messageElement.textContent = data.choices[0].message.content;
            
        }).catch((error)=>{
            messageElement.textContent = "Oops! Something Went Wrong, Please try again !"
}).finally(() => {
    chatbox.scrollTo(0, chatbox.scrollHeight);

})
    }

const handleChat = ()=>{
    userMessage = chatInput.value.trim();
    if(!userMessage)return;
    // Append user's message in chatbox 
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = ""
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    // displaying thinking  message while waiting for response
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking ... ", "incoming")
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    }, 600);
}

// functionality for press enter and message has sent 
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();  // Prevents the default behavior (e.g., newline in a textarea)

        // Call handleChat to send the message
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatBotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatBotToggler.addEventListener("click",() => document.body.classList.add("show-chatbot"));









