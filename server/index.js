const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const UserModel = require('./models/users');
const ProduModel = require('./models/productos');
const { Sequelize,DataTypes } = require('sequelize');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.use(cors())
app.get('/', (req, res) => {
  res.send('<h2>Servidor Iniciado!</h2>');
});


// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './projecto.db'
  });

 

// Middleware para parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Instanciando os Modelos 
const users = UserModel(sequelize, DataTypes)
const produtos = ProduModel(sequelize, DataTypes)


// Ruta para login


app.post('/login', async (req, res) => {
  const { name, senha } = req.body;
  try {
    const user = await users.findOne({ where: {name,senha}});

 if (user) {
      res.status(200).json({ success: true, message: 'Login com sucesso' });
    }else{
      res.status(401).json({ success: false, message: 'Usuario ou senha incorreta' });
    }

 
   
} catch (error) {
    res.status(500).send('Error during login');
}
 });


// CRUD routes para modelo Users *********************//

app.get('/users', async (req, res) => {
  const user = await users.findAll();
  res.json(user);
});

app.get('/users/:id', async (req, res) => {
  const user = await users.findByPk(req.params.id);
  res.json(user);

});

app.post('/users/create', async (req, res) => {
  const user = await users.create(req.body);
  res.json(user);
  
});

app.put('/users/update/:id', async (req, res) => {
  const user = await users.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);

  } else {
    res.status(404).json({ message: 'Usuario não encontrado' });
  }
});



app.delete('/users/:id', async (req, res) => {
 const user = await users.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'Usuario excluido' });
  } else {
    res.status(404).json({ message: 'Usuario não encontrado' });
  }


});


// Multi delete 
app.delete('/items/users', async (req, res) => {
  const ids = req.body.ids; // Se espera un array de IDs a eliminar

  try {
    await users.destroy({
      where: {
        id: ids,
      },
    });
    res.status(200).json({ message: 'Usuarios excluidos com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






// *******************CRUD routes para modelo produtos *********************//


app.get('/produtos', async (req, res) => {
  const product = await produtos.findAll();
  res.json(product);
});

app.get('/produtos/:id', async (req, res) => {
  const product = await produtos.findByPk(req.params.id);
  res.json(product);

});

app.post('/produtos/create', async (req, res) => {
  const product = await produtos.create(req.body);
  res.json(product);
  
});


app.put('/produtos/update/:id', async (req, res) => {
  const product = await produtos.findByPk(req.params.id);
  if (product) {
    await product.update(req.body);
    res.json({message: 'Producto atualizado !'});

  } else {
    res.status(404).json({ message: 'Usuario não encontrado' });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  const product = await produtos.findByPk(req.params.id);
   if (product) {
     await product.destroy();
     res.json({ message: 'Item excluido !' });
   } else {
     res.status(404).json({ message: 'Item não encontrado' });
   }
 });

 // Multi delete 
app.delete('/items/produtos', async (req, res) => {
  const ids = req.body.ids; // Se espera un array de IDs a eliminar

  try {
    await produtos.destroy({
      where: {
        id: ids,
      },
    });
    res.status(200).json({ message: 'Items excluidos com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Start server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });