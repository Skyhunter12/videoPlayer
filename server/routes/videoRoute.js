let express = require('express')
const multer = require('multer');
let router = express.Router();
let {getAllVideos,
    postVideo,
    getVideoById,
    updateVideo,
    deleteVideo} = require('../controller/videoController')

    let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.mimetype == "image/png" ||
        file.mimetype =="image/jpg" ||
        file.mimetype =="image/jpeg"){
            cb(null,'./assets/images')
        }else{
            cb(null,'./assets/videos')
        }
    },
    filename:(req,file,cb)=>{
        let date =Date.now()
        const filename = file.originalname.toLowerCase().split(' ').join('-').replace(/(\.[^\.]+)$/,date+'$1');
        cb(null,filename)
    }
})

let upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*20
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype == "image/png" ||
        file.mimetype =="image/jpg" ||
        file.mimetype =="image/jpeg"||
            file.mimetype === 'video/gif'||
         file.mimetype === 'video/mp4'||
         file.mimetype === 'video/ogg'||
         file.mimetype === 'video/wmv'||
         file.mimetype === 'video/x-flv'||
         file.mimetype === 'video/avi'||
         file.mimetype === 'video/webm'||
         file.mimetype === 'video/mkv') {
        cb(null, true);
        }else{
            cb(null, false)
            return cb(new Error('only .png, .jpg/jpeg .gif, .mp4, .ogg, .wmv, .x-flv, .avi, .webm, .mkv, .avchd, .mov  are allowed for video format'));
        }
    }
});
// let uploadImage = multer({
//     storage:imgStorage,
//     limits:{
//         fileSize:1024*1024*5
//     },
//     fileFilter:(req,file,cb)=>{
//         if() {
//         cb(null, true);
//         }else{
//             cb(null, false)
//             return cb(new Error('only .png, .jpg/jpeg are allowed for image format'));
//         }
//     }
// });


router.get('/',getAllVideos);

router.post('/',upload.fields([{name:'videoUrl',maxCount:1},{name:'imageUrl',maxCount:1}]) , postVideo);

router.get('/:id',getVideoById);

router.put('/:id',updateVideo);

router.delete('/:id',deleteVideo);

module.exports = router;