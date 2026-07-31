import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {

  if(req.method !== "POST"){
    return res.status(405).json({
      error:"Method not allowed"
    });
  }

  try {

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
  model:"gemini-2.0-flash"
});



    const {username,bio} = req.body;


    const prompt = `
Kamu adalah komedian roasting Indonesia.

Buat roast Instagram yang lucu.

Data:
Username: ${username}
Bio: ${bio}

Aturan:
- Lucu dan kreatif
- Jangan menghina fisik
- Jangan menyerang SARA
- Maksimal 100 kata
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();


    res.status(200).json({
      roast:text
    });


  } catch(error){

    res.status(500).json({
      error:error.message
    });

  }
}
