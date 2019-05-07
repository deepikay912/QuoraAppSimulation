var Model = require('../config/MongoConnection')

function handle_request(message, callback){
   Model.UserModel.findOne({"Email":message.body.Email},(err,user)=>{
       if(user)
       {
           user.QuestionsFollowed.push(message.body.question)
           user.save()
           .then(res=>{

          
            
               Model.QuestionsModel.findOne({"Question":message.body.question},(err,question)=>{
                   console.log("Question is"+question)
                   if(question)
                   {

                    var activity = Model.ActivityModel ({
                        action : "follow",
                        owner_email : message.body.Email,
                        question : question
                    })
            
                    activity.save();

                       question.Followers.push(message.body.Email)
                       question.save()
                       .then(response=>{callback(null,response)})
                       .catch(err=>callback(err,null))
                   }
                   else
                    callback(err,null)
               })
           })
           .catch(err=>callback(err,null))
       }
   })
}
exports.handle_request = handle_request;