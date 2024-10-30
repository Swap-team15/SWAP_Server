const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()
const sequelize = require('./config/db')
const { Op } = require('sequelize')
const Bike = require('./models/Bike')
const Subscribe = require('./models/Subscribe')
const User = require('./models/User')

const PORT = process.env.PORT

app.use(express.json())
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
		withCredentials: true,
		optionsSuccessStatus: 200,
	}) 
)

sequelize.sync().then(() => {
    console.log('모델이 동기화되었습니다.')
}).catch(err => {
    console.error('동기화 실패:', err)
}); // DB 동기화 (모델 기준으로 테이블을 자동으로 생성)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

app.get('/bike', async (req, res) => {
    try {
        const data = await Bike.findAll({raw: true})
        console.log('조회된 데이터:', data)
        res.json(data)
    } catch (err) {
        console.error('쿼리 실행 오류:', err)
        res.status(500).send('서버 오류')
    }
})

app.get('/bike/:id', async (req, res) => {
    try{
        const id = req.params.id
        const data = await Bike.findByPk(id, {raw: true})
        console.log('조회된 데이터:', data)
        res.json(data)
    } catch (err) {
        console.error('쿼리 실행 오류:', err)
        res.status(500).send('서버 오류')
    }
})

app.post('/bike/:id/subscribe', async (req, res) => {
    try {
        const bikeid = req.params.id
        const { price, location, accessory } = req.body

        const bike = await Bike.findByPk(bikeid)

        bike.userid = 'user'
        await bike.save()

        const newSubscribe = await Subscribe.create({
            bikeid: bikeid,
            userid: bike.userid,
            borrow: false,
            price: price,
            location: location,
            blocation: '대전 자전거 주차장',
            accessory: accessory
        })
        
        res.status(201).json({
            message: '새 데이터가 성공적으로 추가되었습니다.',
            data: newSubscribe
        })
    } catch (err) {
        console.error('데이터 추가 오류:', err);
        res.status(500).json({ error: '서버 오류. 데이터를 추가할 수 없습니다.' });
    }
})

app.get('/subscribe', async (req, res) => {
    try {
        const data = await Subscribe.findAll({raw: true})
        console.log('조회된 데이터:', data)
        res.json(data)
    } catch (err) {
        console.error('쿼리 실행 오류:', err)
        res.status(500).send('서버 오류')
    }
})

app.get('/subscribe/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await Subscribe.findByPk(id, {raw: true})
        console.log('조회된 데이터:', data)
        res.json(data)
    } catch (err) {
        console.error('쿼리 실행 오류:', err)
        res.status(500).send('서버 오류')
    }
})

app.put('/subscribe/:id/borrow', async (req, res) => {
    try {
        const id = req.params.id;
        const borrow = req.body.borrow;

        const subscribe = await Subscribe.findByPk(id)
        if (!subscribe) {
            return res.status(404).json({
                message: '해당 구독 항목을 찾을 수 없습니다.'
            })
        }
        subscribe.borrow = borrow
        await subscribe.save()
 
        res.status(200).json({
            message: 'borrow가 성공적으로 업데이트되었습니다.',
            data: subscribe
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            message: 'borrow 상태 업데이트 중 오류가 발생했습니다.',
            error: error.message
        })
    }
})

app.get('/map', async (req, res) => {
    const query = req.query.q
    try {
        const data = await Subscribe.findByBorrow(query)
        
        if (data.length > 0) {
            console.log('조회된 데이터:', data)
            res.json(data)
        } else {
            res.status(404).send('데이터를 찾을 수 없습니다.')
        }
    } catch (err) {
        console.error('쿼리 실행 오류:', err)
        res.status(500).send('서버 오류')
    }
})