export default async function handler(req, res) {

if(req.method !== "POST"){
return res.status(405).json({error:"Método não permitido"});
}

try{

const { image } = req.body;

if(!image){
return res.status(400).json({error:"Imagem não enviada"});
}

const api_user = process.env.SIGHTENGINE_USER;
const api_secret = process.env.SIGHTENGINE_SECRET;

const formData = new FormData();

formData.append("media", Buffer.from(image, "base64"), "image.jpg");
formData.append("models", "nudity-2.1 gore-2.0");
formData.append("api_user", api_user);
formData.append("api_secret", api_secret);

const response = await fetch("https://api.sightengine.com/1.0/check.json",{
method:"POST",
body:formData
});

const data = await response.json();

return res.status(200).json(data);

}catch(error){

console.error(error);

return res.status(500).json({
error:"Erro ao analisar imagem"
});

}

  }
