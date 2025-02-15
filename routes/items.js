const Item = require('../item')
const express = require('express')
const router = new express.Router()
const items = require('../fakeDB')


router.get('', function(req, res, next) {
    try {
        return res.json({ items: Item.findAll() })
    } catch(err) {
        return next(err)
    }
})

router.post('', function(req, res, next) {
    let newItem = { name: req.body.name, price: req.body.price }
    items.push(newItem)
    res.status(201).json({ name: newItem})
})

router.get('/:name', function(req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined) {
        throw new ExpressError('Item not found', 404)
    }
    res.json({ item: foundItem})
})

router.patch('/:name', function(req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined) {
        throw new ExpressError('Item not found', 404)
    }
    foundItem.name = req.body.name
    res.json({ item: foundItem})
})


router.delete('/:name', function(req, res) {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
        throw new ExpressError('Item not found', 404)
    }
    items.splice(foundItem, 1)
    res.json({msg: 'Deleted'})
})

module.exports = router