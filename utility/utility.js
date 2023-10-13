const httpResponse = (statueTxt, dataRes) => {
    return { status: statueTxt, data: dataRes };
};
const errHandle = (status_text, status_code, message, data=null ) => {
    return { status_text, status_code, message, data };
};



module.exports = { httpResponse, errHandle };