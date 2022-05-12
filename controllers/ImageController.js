const Image = require('../models/Image');
const Task = require('../models/Task');
const { ResourseNotFoundError } = require('../error');

class Images {
  static async ImageUpload(req, res, next) {
    const title = req.body.title;
    const picture = req.file.filename;
    const user_name = req.user.name;
    const sender_id = req.user.id;
    const sender_role=  req.user.role
    const task_id = req.params.id;
    try {
      const findTask = await Task.findOne({ _id: task_id });
      if (!findTask) {
        throw new ResourseNotFoundError('There is no Task with ID: ' + task_id);
      } else {
        const findImage = await Image.findOne({ task_id: task_id });
        if (findImage) {
          const images = {
            $push: {
              images: [
                {
                  picture: picture,
                  sender_id: sender_id,
                  sender_name: user_name,
                  sender_role: sender_role
                },
              ],
            },
          };
          const updateWidthNewImage = await Image.updateOne(
            { task_id: task_id },
            images
          );
          if (!updateWidthNewImage) {
            throw new ResourseNotFoundError('Image is not Added');
          } else {
            res.json({ message: 'One more Image is Added' });
          }
        } else {
          const imageUpload = await Image.create({
            title,
            task_id,
            images: [
              {
                picture: picture,
                sender_id: sender_id,
                sender_name: user_name,
                sender_role: sender_role
              },
            ],
          });
          if (!imageUpload) {
            throw new ResourseNotFoundError('Image is not Uploaded');
          } else {
            res.json({ message: 'One more Image is Uploaded' });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async GetAllImages(req, res, next) {
    const title = req.body.title;
    const picture = req.file.filename;
    const user_name = req.user.name;
    const sender_id = req.user.id;
    const sender_role=  req.user.role
    const task_id = req.params.id;
    try {
      const findTask = await Task.findOne({ _id: task_id });
      if (!findTask) {
        throw new ResourseNotFoundError('There is no Task with ID: ' + task_id);
      } else {
        const findImage = await Image.findOne({ task_id: task_id });
        if (findImage) {
          const images = {
            $push: {
              images: [
                {
                  picture: picture,
                  sender_id: sender_id,
                  sender_name: user_name,
                  sender_role: sender_role
                },
              ],
            },
          };
          const updateWidthNewImage = await Image.updateOne(
            { task_id: task_id },
            images
          );
          if (!updateWidthNewImage) {
            throw new ResourseNotFoundError('Image is not Added');
          } else {
            res.json({ message: 'One more Image is Added' });
          }
        } else {
          const imageUpload = await Image.create({
            title,
            task_id,
            images: [
              {
                picture: picture,
                sender_id: sender_id,
                sender_name: user_name,
                sender_role: sender_role
              },
            ],
          });
          if (!imageUpload) {
            throw new ResourseNotFoundError('Image is not Uploaded');
          } else {
            res.json({ message: 'One more Image is Uploaded' });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async DeleteImage(req, res, next) {
    const title = req.body.title;
    const picture = req.file.filename;
    const user_name = req.user.name;
    const sender_id = req.user.id;
    const sender_role=  req.user.role
    const task_id = req.params.id;
    try {
      const findTask = await Task.findOne({ _id: task_id });
      if (!findTask) {
        throw new ResourseNotFoundError('There is no Task with ID: ' + task_id);
      } else {
        const findImage = await Image.findOne({ task_id: task_id });
        if (findImage) {
          const images = {
            $push: {
              images: [
                {
                  picture: picture,
                  sender_id: sender_id,
                  sender_name: user_name,
                  sender_role: sender_role
                },
              ],
            },
          };
          const updateWidthNewImage = await Image.updateOne(
            { task_id: task_id },
            images
          );
          if (!updateWidthNewImage) {
            throw new ResourseNotFoundError('Image is not Added');
          } else {
            res.json({ message: 'One more Image is Added' });
          }
        } else {
          const imageUpload = await Image.create({
            title,
            task_id,
            images: [
              {
                picture: picture,
                sender_id: sender_id,
                sender_name: user_name,
                sender_role: sender_role
              },
            ],
          });
          if (!imageUpload) {
            throw new ResourseNotFoundError('Image is not Uploaded');
          } else {
            res.json({ message: 'One more Image is Uploaded' });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async UpdateImage(req, res, next) {
    const title = req.body.title;
    const picture = req.file.filename;
    const user_name = req.user.name;
    const sender_id = req.user.id;
    const sender_role=  req.user.role
    const task_id = req.params.id;
    try {
      const findTask = await Task.findOne({ _id: task_id });
      if (!findTask) {
        throw new ResourseNotFoundError('There is no Task with ID: ' + task_id);
      } else {
        const findImage = await Image.findOne({ task_id: task_id });
        if (findImage) {
          const images = {
            $push: {
              images: [
                {
                  picture: picture,
                  sender_id: sender_id,
                  sender_name: user_name,
                  sender_role: sender_role
                },
              ],
            },
          };
          const updateWidthNewImage = await Image.updateOne(
            { task_id: task_id },
            images
          );
          if (!updateWidthNewImage) {
            throw new ResourseNotFoundError('Image is not Added');
          } else {
            res.json({ message: 'One more Image is Added' });
          }
        } else {
          const imageUpload = await Image.create({
            title,
            task_id,
            images: [
              {
                picture: picture,
                sender_id: sender_id,
                sender_name: user_name,
                sender_role: sender_role
              },
            ],
          });
          if (!imageUpload) {
            throw new ResourseNotFoundError('Image is not Uploaded');
          } else {
            res.json({ message: 'One more Image is Uploaded' });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Images;
