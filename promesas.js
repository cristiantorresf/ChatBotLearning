/* INFIERNO DE CALLBACKS */
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

// USA PROMESAS MEJOR

function requestHandler(req, res) {
   User.findById(req.userId)
      .then((encontradousuario) => {
         return Tasks.findById(encontradousuario.tasksId)
      })
      .then((tareasencontradas) => {
         tareasencontradas.completed = true;
         return tareasencontradas.save();
      })
      .then(() => {
         console.log('tareas completadas')
      })
      .catch(errores => res.send(errores))
}