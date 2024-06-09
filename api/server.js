const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const VALID_TOKENS = [
    'tarot?rc4Q=zuG?0x6o-OjeaZrzFO34gp73EAmgl?0pST0HO=oFAKdNYAbTS?A9KjTtgNSkZDTHHSX5/VnmOc6PcDGiYfnPd0vz?O0ddERwfywE5Pzl1q1yB4eATfDU65f4tjlhttyGPu5j8D9JWYCaaZ/HYjihjc2VV=gSIsgEqjTH5rOKqH7hT5g3c!LaLFckIHPCo?eGG1TcMIRoNKFyPB1NzAjAnmnf5eJV-i6CxmMHVZzU0XuZlB-M3mLjB',
    'otro-token-generado-manualmente',
    'y-otro-token'
];

// Verificar el token y permitir el acceso a la plataforma
app.post('/api/verify-token', (req, res) => {
    const { token } = req.body;

    if (VALID_TOKENS.includes(token)) {
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'Token inválido' });
    }
});

// Middleware para verificar el token antes de servir la página protegida
app.get('index.html', (req, res, next) => {
    const token = req.query.token;

    if (VALID_TOKENS.includes(token)) {
        next();
    } else {
        res.redirect('/verificacion');
    }
});

// Servir la página de verificación
app.get('/verificacion', (req, res) => {
    res.sendFile(path.join(__dirname, 'verificacion.html'));
});

// Servir la página protegida
app.get('/plataforma-protegida', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

