const getToken = () => {
  const input = document.getElementById("token");
  return input.value;
}

const getChannelId = () => {
  const input = document.getElementById("channel");
  console.log(input)
  return input.value;
}

const writeOutput = (text) => {
  const target = document.getElementById("output");
  target.value = text;
}

const getOutput = () => {
  const textarea = document.getElementById("output");
  return textarea.value;
}

const startFetching = () => {
  const token = getToken();
  const channelId = getChannelId();
  const headers = new Headers({
    "Content-Type": "application/json"
  });
  
  fetch("http://localhost:3000/fetch", { method: "POST", body: JSON.stringify({ token, channelId }), headers, mode: "same-origin" } )
  .then(result => {
      result.json()
        .then(json => {
          console.log(json);
          const contents = json.map(message => message.content);
          writeOutput(contents.join("\n"));
          copy(contents.join("\n"));
        })
        .catch(e => console.error(e));
  })
  .catch(e => console.log(e)); 
}

const copy = () => {
  const output = getOutput();
  navigator.clipboard.writeText(output);
  alert("コピーしました。");
}