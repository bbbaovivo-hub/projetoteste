import fetch from "node-fetch";
import FormData from "form-data";

export const handler = async (event) => {

try{

const body = JSON.parse(event.body);

const form = new FormData();

form.append("media", body.media);
form.append("models", "nudity-2.1,gore-2.0");
form.append("api_user", process.env.API_USER);
form.append("api_secret", process.env.API_SECRET);

const response = await fetch("https://api.sightengine.com/1.0/check.json",{
method:"POST",
body:form
});

const data = await response.json();

return{
statusCode:200,
body:JSON.stringify(data)
};

}catch(error){

return{
statusCode:500,
body:JSON.stringify({error:"Erro na verificação"})
};

}

};
