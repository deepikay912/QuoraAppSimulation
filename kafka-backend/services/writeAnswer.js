var Model = require('../config/MongoConnection')

function handle_request(message, callback){
    console.log('In kafka request for writing answer ', message);
    Model.UserModel.findOne({"Email":message.body.owner},function(err,user)
    {
        if(err)
        console.log("unable to fetch user");
        else {
       // var imageOfUser = user.ProfilePicture
        var answer = Model.AnswerModel({
            answer : message.body.answer,
            owner : message.body.owner,
            isAnonymous:message.body.isAnonymous,
            date:message.body.date,
            question:message.body.question,
            views : 0,
            bookmarks : 0
           // images : imageOfUser
        })
        user.QuestionsAnswered =  user.QuestionsAnswered || []
        user.QuestionsAnswered.push(answer)
        console.log("User retrieved is"+user)
        user.save().
        then(res=>console.log(res))
        .catch(err=>console.log(err))

        answer.save()
        .then(response =>{

            

            Model.QuestionsModel.findOne({"Question":message.body.question},(err,question)=>{
                console.log("I am Ques"+question)
                user.QuestionsAnswered =  user.QuestionsAnswered || []
                question.Answers.push(answer)
                console.log("followers");
                console.log(question.Followers);

                var activity = Model.ActivityModel ({
                    action : "answer",
                    owner_email : message.body.owner,
                    question :question
                    });
        
                    activity.save();

                    
                for(var i in question.Followers) {
                //    console.log("email" + email);

                        Model.UserModel.findOne({"Email": question.Followers[i]},(err,user) => {
                            console.log("in followers");
                            console.log(question.Followers[i]);

                            if(user) {
                            var notification = {
                                answerOwner : message.body.owner,
                                question :  message.body.question,
                                action : 'answer',
                                postedTime : new Date(),
                                read : false
                            }
                        
                            user.notifications = user.notifications || [];
                            user.notifications.push(notification);
                            user.save()
                        }
                        })
                }
                
                question.save().then(res=>{
                    console.log(res);
                    callback(null,res)
                })
                .catch(err=> {
                    console.log(err)
                    callback(err,null)
                })
            })
        })
    }

    })

}
exports.handle_request = handle_request;
