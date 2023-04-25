
function controladorSubirImagen(req, res){
    const file = req.file

    if (!file) {
        res.status(400)
        return res.status(200).send('Please upload a file')
    }
   
    const url = req.protocol + '://' + req.get('host') + '/' + file.originalname
    res.send({cdn: url})
}




export  {controladorSubirImagen};