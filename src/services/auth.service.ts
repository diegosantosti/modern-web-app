import { authRepository } from '@/repositories/auth.repository'

class AuthService {

    private readonly url = 'http://localhost:3030/auth/login'

    public getLoggedUser() {
        return authRepository.getLogged()
    }

    public logOff() {
        authRepository.removeLoggedUser()
    }

    public async login(username: string, password: string) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ username, password })
        })

        if (response.status === 201) {
            response.json().then(logged => {
                authRepository.setLogged(logged)
            })
            return true
        }

        return false
    }

}

export const authService = new AuthService()