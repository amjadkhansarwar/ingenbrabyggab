const { ResourseNotFoundError } = require('../error');
const Message = require('../models/Message');
const Task = require('../models/Task');

class Mymessage {
  static async CreateMessage(req, res, next) {
    const user_id = req.user.id
    const user_name = req.user.name
    const user_role= req.user.role
    const title = req.body.title
    const text = req.body.text;
    let task_id = req.params.id;
    try {
      const findTask = await Task.findOne({ _id: task_id });
      if (!findTask) {
        throw new ResourseNotFoundError('There is no Task with ID: ' + task_id);
      } else {
        const findMessage = await Message.findOne({ task_id: task_id });
        if (findMessage) {
          const messgae = { $push: { message: [ { text: text, sender_id: user_id, sender_name: user_name, sender_role: user_role }] } }
          const updateWidthNewMessage = await Message.updateOne({ task_id: task_id }, messgae );
          if (!updateWidthNewMessage) {
            throw new ResourseNotFoundError('Message is not Sent');
          } else {
            res.json({ message: 'Message is Updated' });
          }
        } else {
          const createMessage = await Message.create({
            title,
            task_id,
            message: [
              { text: text, sender_id: user_id, sender_name: user_name,sender_role: user_role },
            ],
          });
          if (!createMessage) {
            throw new ResourseNotFoundError('Message is not Sent');
          } else {
            res.json({ message: 'Message is sent with User' });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Mymessage;
