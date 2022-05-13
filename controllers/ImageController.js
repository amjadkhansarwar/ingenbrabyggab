
const Task = require('../models/Task');
const { ResourseNotFoundError } = require('../error');
const path = require("path");
const fs = require("fs");

class Images {
  static  GetAllImages(req, res, next) {
      try {
      const files = fs.readdirSync(path.join("assets", "images"));
      let images = [];
      files.forEach((file) => {images.push(file)});
      res.json(images);
      } catch (error) {
      next(error)
      }
  }
  static async getImageById(req, res, next){
    try {
      const task_id = req.params.id;
      const findTask = await Task.findOne({ _id: task_id});
      if (!findTask) {
          throw new ResourseNotFoundError('There is no Task' + task_id);
      }else if(!findTask.image){
       res.json({message: 'This task dont have any Picture'})
       }else{
        const fileName = findTask.image;
        const image =
          path.join(__dirname, "..","assets","images", fileName)
        res.sendFile( image )
      }
    } catch (error) {
      next(error)
    }
  }
 
}

module.exports = Images;
