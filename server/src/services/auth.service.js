import { queryReturn } from "../config/mysqlconfig.js";
import {
  hashPassword,
  checkPassword,
  sendOTPViaSMS,
  generateAccessToken,
  sendMail,
  isUserExists,
  verifyToken
} from "../utils/utils.js";
import { logger } from "../common/logger.js";

export const signInByEmailIdService = async (email, password) => {
  try {
    const query = "SELECT userid, email, password FROM users WHERE email = ?";
    const rows = await queryReturn(query, [email]);

    if (rows.length === 0) {
      return {
        message: "User not found with provided email",
      };
    }

    const isMatched = await checkPassword(password, rows[0].password);

    if (!isMatched) {
      const err = new Error("Invalid password");
      err.statusCode = 401;
      throw err;
    }

    const userPayload = {
      userid: rows[0].userid,
      email: rows[0].email,
    };

    const accessToken = generateAccessToken(userPayload, "1d");

    return {
      data: {
        accessToken,
      },
      message: "Login successful",
    };
  } catch (err) {
    logger.error("Error in signInByEmailIdService:", err);
    throw err;
  }
};

export const signInByMobileService = async (mobile) => {
  try {
    const otp = await sendOTPViaSMS(mobile);
    return {
      message: "OTP sent successfully",
      otp,
    };
  } catch (err) {
    logger.error("Error in signInByMobileService:", err);
    throw err;
  }
};

export const checkUserByEmailOrMobileService = async (contact) => {
  try {
    let query, type;
    if (contact.includes("@")) {
      query = "SELECT email FROM users WHERE email=?";
      type = "email";
    } else {
      query = "SELECT mobile FROM users WHERE mobile=?";
      type = "mobile";
    }

    const rows = await queryReturn(query, [contact]);
    if (rows.length === 0) {
      return {
        success: false,
        data: { isActive: false, type },
        message: "User not found",
      };
    }

    return {
      success: true,
      data: {
        isActive: true,
        type,
      },
      message: "user found",
    };
  } catch (err) {
    logger.error("Error in checkUserByEmailOrMobileService", err);
    throw err;
  }
};

export const forgetPasswordService = async (
  email,
  newPassword,
  confirmPassword
) => {
  try {
    if (newPassword !== confirmPassword) {
      return { message: "Both passwords must be the same" };
    }

    const hashPsswd = hashPassword(newPassword);

    const query = "UPDATE users SET password = ? WHERE email = ?";
    const result = await queryReturn(query, [hashPsswd, email]);

    if (result.affectedRows === 0) {
      return { message: "User not found with provided email" };
    }

    return { message: "Password updated successfully" };
  } catch (err) {
    logger.error("Error in forgetPasswordService:", err);
    throw err;
  }
};

export const changePasswordService = async (
  email,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const query = "SELECT password FROM users WHERE email = ?";
    const rows = await queryReturn(query, [email]);

    if (!rows || rows.length === 0) {
      const err = new Error("User not found with provided email");
      err.statusCode = 404;
      throw err;
    }

    const isMatched = await checkPassword(oldPassword, rows[0].password);

    if (!isMatched) {
      const err = new Error("Invalid old password");
      err.statusCode = 401;
      throw err;
    }

    if (oldPassword == newPassword) {
      const err = new Error(
        "New password cannot be the same as the old password"
      );
      err.statusCode = 400;
      throw err;
    }

    if (newPassword !== confirmPassword) {
      const err = new Error(
        "New password and confirmation password do not match"
      );
      err.statusCode = 400;
      throw err;
    }

    const hashPsswd = hashPassword(newPassword);

    const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
    const result = await queryReturn(updateQuery, [hashPsswd, email]);

    if (result.affectedRows === 0) {
      const err = new Error("Failed to update password");
      err.statusCode = 500;
      throw err;
    }

    return { message: "Password updated successfully" };
  } catch (err) {
    logger.error("Error in changePasswordService:", err);
    throw err;
  }
};

export const sendInviteServices = async ( targetEmail, userid ) => {
  try {
    const isUser = await isUserExists(targetEmail)
    if (isUser) {
      return {
        message :"User already exists"
      }
    }

    const createdat = Date.now()
    const token = generateAccessToken({ targetEmail }, "24h");

    const inviteLink = `https://yourfrontend.com/accept-invite?token=${token}`;

    const linkQuery = "INSERT INTO invitelinks(email, invitedby, linktoken, createdat) VALUES (?, ?, ?, ?)";
    await queryReturn(linkQuery, [targetEmail, userid ,token, createdat])

    const query = "SELECT username FROM users WHERE userid = ?";
    const rows = await queryReturn(query, [userid]);


    const html = `
    <div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #333; background-color: #f5f7fa; padding: 40px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" 
                  style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
              
              <!-- Header / Logo -->
              <tr>
                <td style="padding: 25px 30px; border-bottom: 1px solid #eee; background-color: #f9f9f9;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="vertical-align: middle; padding-right: 10px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/5501/5501371.png" width="28" height="28" alt="Tracker Logo" />
                      </td>
                      <td style="vertical-align: middle;">
                        <span style="font-size: 22px; font-weight: bold; color: #333;">
                          T<span style="color: #eb4034;">racker</span>
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 30px;">
                  <p style="margin: 0 0 15px; font-size: 16px;">Hello,</p>
                  <p style="margin: 0 0 15px; font-size: 16px;">
                    You have been invited to join <strong>Tracker</strong> by ${rows[0].username} 
                  </p>
                  <p style="margin: 0 0 20px; font-size: 15px;">
                    Click the button below to accept your invitation and start exploring:
                  </p>
                  <p style="margin: 20px 0;">
                    <a href="${inviteLink}" target="_blank"
                      style="background-color: #eb4034; color: white; text-decoration: none; 
                              padding: 12px 30px; border-radius: 6px; font-size: 15px; 
                              font-weight: 500; display: inline-block;">
                      Accept Invitation
                    </a>
                  </p>
                  <p style="margin: 0 0 15px; font-size: 14px; color: #555;">
                    This link will expire in <strong>24 hours</strong>.
                  </p>
                  <p style="margin: 0; font-size: 14px; color: #555;">
                    If you have any questions, feel free to reach out to our support team.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px 30px; border-top: 1px solid #eee; background-color: #f9f9f9; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #999;">
                    This email was sent by <strong>S-Mail</strong>.<br/>
                    Please do not reply directly to this message.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </div>
    `;

    const mailOptions = {
      from: `"Tracker App" <${process.env.EMAIL_USER}>`,
      to: targetEmail,
      subject: "You’re invited to join!",
      html: html,
    };

    await sendMail(mailOptions);

    return {
      message: "Invitation link sent successfully",
    };
  } catch (err) {
    logger.error("Error in sendUserInviteServices:", err);
    throw err;
  }
};

export const verifyInviteTokenService = async (token) => {
  try {
    const { valid, decoded, message } = verifyToken(token);
    if (!valid) {
      return { success: false, message };
    }

    const targetEmail = decoded.targetEmail;

    const query = `
      SELECT email, invitedby, linktoken, createdat 
      FROM invitelinks 
      WHERE linktoken = ? AND email = ?;
    `;
    const rows = await queryReturn(query, [token, targetEmail]);

    if (rows.length === 0) {
      return { success: false, message: "Invitation not found or already used" };
    }

    const createdAt = Number(rows[0].createdat);
    const now = Date.now();
    if (now - createdAt > 24 * 60 * 60 * 1000) {
      return { success: false, message: "Invitation link expired" };
    }

    return {
      success: true,
      message: "Invitation link is valid",
      email: targetEmail,
      invitedBy: rows[0].invitedby,
    };
  } catch (err) {
    logger.error("Error in verifyInviteTokenService:", err);
    throw err;
  }
};