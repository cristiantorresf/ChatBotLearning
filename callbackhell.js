import {
   userInfo
} from "os";


/* CALLBACK HELL */
function requestHandler(req, res) {
   User.findById(req.userId, (err, resultado) => {
      if (err) {
         res.send(err);
      } else {
         Tasks.findById(resultado.tasksId, (err, tasks) => {
            if (err) {
               return res.send(err);
            } else {
               tasks.completed = true;
               tasks.save((err) => {
                  if (err) {
                     return res.send(err);
                  } else {
                     res.send('tareas completadas');
                  }
               })
            }

         })
      }
   })
}