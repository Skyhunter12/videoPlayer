const url = require('url');
const fs = require('fs')
const path = require('path');
let Video = require('../models/videoModel');

exports.getAllVideos = async (req,res,next)=>{
    try {
        let videoDetail = await Video.find() 
        if(!videoDetail){
        return res.status(400).json({
                'message':'No data exists for video details',
                'success':false
            })
        }
        res.status(200).json({
            'message':'All video details are retrieved successfully',
            'success':true,
            'videodetails':videoDetail
        })

    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'error/s':error
        })
    }
}

exports.postVideo = async (req,res,next)=>{
    try {
        let url = req.protocol+'://'+req.get('host');
        let videoName = req.files.videoUrl[0].filename
        let imageName = req.files.imageUrl[0].filename
        let {title,description} = req.body
        let newVideo = new Video({
            title:req.body.title,
            videoUrl:url+'/assets/videos/'+videoName,
            imageUrl:url+'/assets/images/'+imageName,
            description:req.body.description
        })

        let uploaded = await newVideo.save();
        if(!uploaded){
            return res.status(400).json({
                'message':'Error in fields',
                'success':false
            })
        }
        res.status(200).json({
            'message':'New data uploaded successfully',
            'success':true,
            'data':uploaded
        })
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'error/s':error
        })
    }
}

exports.getVideoById = async (req,res,next)=>{
    try {
        let videoId = req.params.id;
        video = await Video.findById({_id:videoId})
        if(!video){
            return res.status(400).json({
                    'message':`No data exists for video with id ${videoId} `,
                    'success':true
                })
            }
            res.status(200).json({
                'message':'Video details fetched successfully',
                'success':true,
                'videoDetail':video
            })
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'error/s':error
        })
    }
}

exports.updateVideo = async (req,res,next)=>{
    try {
        let reqId = req.params.id
            const updateDetails = await Video.findOneAndUpdate(reqId,req.body,{ new:true });
            return res.status(200).json({
                'message':'Video details are updated successfully',
                'success':true,
                'data':updateDetails
            })
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'error/s':error
        })
    }
}

exports.deleteVideo = async (req,res,next)=>{
    try {
        let _id = req.params.id
        let mediaErase = await Video.findById(req.params.id);
        
        let video_path = new URL(mediaErase.videoUrl).pathname;
        let image_path = new URL(mediaErase.imageUrl).pathname;

        if(!mediaErase){
         return res.status(400).json({
                'message':`Details for ${_id} doesn't exist`,
                'success':false
            })
        }
        fs.unlinkSync(path.join(__dirname,'..',`${video_path}`));
        fs.unlinkSync(path.join(__dirname,'..',`${image_path}`));
        res.status(200).json({
            'message':`Details for ${_id} are deleted successfully`,
            'success':true
        })
        await mediaErase.remove();
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'error/s':error
        })
    }
}