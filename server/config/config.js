



//////
//PUERTO
/////

process.env.PORT = process.env.PORT || 3000;




//SEGURIDAD 



//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'




// BASE DE DAtOS

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/savage_cafe'
} else {
    urlDB = 'mongodb+srv://AleFullStack:1867DanLula@cluster0-p2jik.mongodb.net/savage_cafe'
}

// mongodb://localhost:27017/savage_cafe'


// mongodb+srv://AleFullStack:<password>@cluster0-p2jik.mongodb.net/test

process.env.URLDB = urlDB;