import { onMounted, onUnmounted } from "vue";
import { useGame } from "@/stores/game.js";

export function useGameLoop(intervalMs = 100) {
    let game = useGame()
    let tickId = null;
    let lastTick = 0;

    onMounted(() => {
        lastTick = performance.now();

        tickId = setInterval(() => {
            let now = performance.now();
            let dt = Math.min((now - lastTick) / 1000, 1)

            lastTick = now;
            game.tick(dt)
        }, intervalMs)
    })

    onUnmounted(() => {
        clearInterval(tickId)
    })
}