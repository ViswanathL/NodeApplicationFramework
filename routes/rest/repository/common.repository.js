var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

exports.findOne = (model, whereClause, select) => {
	return model.findOne(whereClause).select((select && select.length > 0)?select:['-__v']).
		then(data => {
			return data;
		}).catch(e => {
			return Promise.reject(e);
		});
};

exports.findAll = (model, whereClause, select) => {
	return model.find(whereClause?whereClause:{}).select((select && select.length > 0)?select:['-_id'])
	.then(results => {
			return results;
		}).catch(e => {
			return Promise.reject(e);
		});
};

exports.create = (model, data) => {
	var body = data;
	return new model(body).save().
		then(() => {
			// eslint-disable-next-line no-unreachable
			return body;
		}).catch(e => {
			return Promise.reject(e);
		});
};

exports.update = (model, whereClause, updateFields) => {
	return model.update(whereClause, {
			$set: updateFields
		}).then(updated => {
			if(updated) {
				return true;
			}
		}).catch(e => {
			return Promise.reject(e);
		});
};

exports.getByPage = (model, whereClause, selectFields, sortBy, queryParams) => {
	return model.aggregate({ 
            $project: selectFields
        }, { 
    		$match: whereClause
    	}, {
			$sort: sortBy
		}, { 
			$limit: ((parseInt(queryParams.page_number) - 1) * parseInt(queryParams.num_results)) + parseInt(queryParams.num_results)
		}, 
		{ 
			$skip : ((parseInt(queryParams.page_number) - 1) * parseInt(queryParams.num_results))
		}).execAsync().then(results => {
			return results;
		}).catch(e => {
			return Promise.reject(e);
		});
};

exports.countTotal = (model, whereClause,selectFields) => {
	return model.aggregate(
        {
        	$project: selectFields
		},
		{ 
        	$match: whereClause
        }, { $group: { 
	        	_id: null, 
	        	count: { 
	        		$sum: 1 
	        	} 
        	} 
    	}).execAsync().then(results => {
        	if(!results || results.length === 0) { 
        		return 0; 
        	}
			return results[0].count;
		}).catch(e => {
			return Promise.reject(e);
		});
};

exports.populate = (model, options, dataToPopulate) => {
	return model.populate(dataToPopulate, options).then(results => {
			return results;
		}).catch(e => {
			return Promise.reject(e);
		});
};

exports.delete = (model, query) => {
	return model.remove(query).then(bool => {
		return(bool);
	}).catch(e => {
		return Promise.reject(e);
	});
};

exports.count = (model, query) => {
	return model.count(query).then(count => {
		return count;
	}).catch(e => {
		return Promise.reject(e);
	});
};

exports.aggregate = (model, query) => {
	return model.aggregate(query).execAsync().then(result => {
		return result;
	}).catch(e => {
		return Promise.reject(e);
	});
};

exports.updateMany = (model, query, updateFields) => {
	return model.updateMany(query, {$set:updateFields}).then(updated =>{
		if(updated) { return updated; }
	}). catch(e=> {
		return Promise.reject(e);
	});
};