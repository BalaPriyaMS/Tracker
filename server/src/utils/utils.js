import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator"

export const generalResponse = (res, resObject) => {
    if (resObject.err){
        return res
         .status( resObject.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
         .json({
            status:"Failure",
            data: null,
            err: resObject.err || null,
            mssg: resObject.mssg || null
         }) ;
    }
    return res.status( resObject.statusCode || httpStatus.OK)
     .json({
        status:"Success",
        data: resObject.data || null,
        err: null,
        mssg: resObject.mssg || null
     });
}

export const hashPassword = (paswd) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(paswd, salt);
}

export const checkPassword = (password, storedHash) => {
    return bcrypt.compare(password, storedHash);
}

export const reqArgValidation = (req, res, next, args) => {
    const missingArgs = args.filter((arg) => {
        return req.body[arg] === undefined 
    });

    if(missingArgs.length > 0){
        return generalResponse(res, {
            err : `Missing required fields: ${missingArgs}`,
            statusCode: 400,
            data: null,
            mgs: "Missing requires field"
        });
    }

    next();
}

export const generateOTP = () => {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    return otp
}