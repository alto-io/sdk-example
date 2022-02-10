import { gameId } from './home'

const createValueDiv = (text, width = '7rem') => {
    const valueDiv = document.createElement('div')
    valueDiv.style.marginLeft = '1rem'
    valueDiv.style.overflow = 'hidden'
    valueDiv.style.width = width
    valueDiv.style.textOverflow = 'ellipsis'

    valueDiv.innerText = text

    return valueDiv
}

export default class Leaderboard {
    constructor(arc) {
        this.arc = arc

        this.root = document.getElementById('leadeboard')
        this.refresh()
    }

    async refresh() {
        const result = await this.arc.fetchLeaderboard('game_id', [gameId], 'token_id')

        this.root.innerHTML = ''
        for (let i = 0; i < result.length; i += 1) {
            const data = result[i]

            const row = document.createElement('div')
            row.style.display = 'flex';

            row.appendChild(createValueDiv(`${i+1}.`, '1.5rem'))
            row.appendChild(createValueDiv(`Contract: ${data.contract_address}`))
            row.appendChild(createValueDiv(`Player: ${data.player_address}. `))
            row.appendChild(createValueDiv(`Token: ${data.token_id}. `))
            row.appendChild(createValueDiv(`Score: ${data.score}. `))

            this.root.appendChild(row)
        }
    }
}