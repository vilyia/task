export interface AuthRequest extends Request {
    cookies: any;
    email?: string;
}
export default AuthRequest;