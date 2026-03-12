exports.handler = async function (event) {

const formData = new FormData();
formData.append("media", event.body);
formData.append("models", "nudity-2.1,gore-2.0");
formData.append("api_user", process.env.API_USER);
formData.append("api_secret", process.env.API_SECRET);

const response = await fetch("https://api.sightengine.com/1.0/check.json",{
method:"POST",
body:formData
});

const data = await response.json();

return {
statusCode:200,
body:JSON.stringify(data)
};

};
