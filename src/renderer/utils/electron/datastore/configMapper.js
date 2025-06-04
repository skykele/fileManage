import db from './index'
import _ from 'lodash'

const Table = 'configServer'

export function postOrPutModel(document) {
	return new Promise((resolve, reject) => {
			try {
					const collection = db.get(Table)
					const model = collection.upsert(document).write()
					resolve({
							code: 200,
							data: _.cloneDeep(model)
					})
			} catch (err) {
					return reject({
							code: 400,
							message: err.message
					})
			}
	})
}

export function postModel(document) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const model = collection.insert(document).write()
            resolve({
                code: 200,
                data: _.cloneDeep(model)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function getModelWhere(attrs) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const list = collection.filter(attrs).value()
            resolve({
                code: 200,
                data: _.cloneDeep(list)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}


export function putModelById(id, attrs) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const model = collection.updateById(id, attrs).write()
            resolve({
                code: 200,
                data: _.cloneDeep(model)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}

export function putModelWhere(whereAttrs, attrs) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.get(Table)
            const model = collection.updateWhere(whereAttrs, attrs).write()
            resolve({
                code: 200,
                data: _.cloneDeep(model)
            })
        } catch (err) {
            return reject({
                code: 400,
                message: err.message
            })
        }
    })
}
