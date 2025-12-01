const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// função para transofrmar os dados recebidos para formato do banco
function transformData(data) {
    return {
        orderId: data.numeroPedido,
        value: data.valorTotal,
        creationDate: new Date(data.dataCriacao),
        items: data.items.map(item => ({
            productId: Number(item.idItem),
            quantity: item.quantidadeItem,
            price: item.valorItem
        }))
    };
}  

// POST - Criar novo pedido

router.post('/order', async (req, res) => {
    try {
        const orderData = transformData(req.body);
    const order = new Order(orderData);
    await order.save();

    res.status(201).json({ message: 'Pedido criado com sucesso', 
        order });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar pedido', 
        error: error.message });
    }
});

// GET - Listar todos os pedidos
router.get('/order/list', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar pedidos', 
        error: error.message });
    }
});


// GET - Buscar pedido por ID
router.get('/order/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id });

        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar pedido', 
        error: error.message });
    }
});

// PUT - Atualizar pedido
router.put('/order/:id', async (req, res) => {
    try {
        const orderData = transformData(req.body);
        const order = await Order.findOneAndUpdate(
            { orderId: req.params.id },
            orderData,
            { new: true }
        );
        
        if (!order) {
            return res.status(404).json({
                message: 'Pedido não encontrado'
            });
        }

        res.status(200).json({ message: 'Pedido atualizado com sucesso', order });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar pedido', error: error.message });
    }
});

// DELETE - Excluir pedido
router.delete('/order/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ orderId: req.params.id });

        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.status(200).json({ message: 'Pedido excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir pedido', error: error.message });
    }
});

module.exports = router;