const validate = (schema) => async (req, res, next) => {

    // validation will throw an error hence use try/catch
    try {
        // validate body, query and params
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (e) {
        return res.status(500).json({error: "Sever error. Please contact adminstrator" })
    }
}

module.exports = {
    validate,
}