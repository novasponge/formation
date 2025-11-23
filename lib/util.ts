export const Util = {
    findLineTail(lineHead: [number, number], angle: number): [number, number] {
        const dy = Math.sin(angle) * 60;
        const dx = Math.cos(angle) * 60;
        return [lineHead[0] - dx, lineHead[1] - dy];
    },

    moveSpeed(linePos: number, endPos: number, timeDelta: number, speedAmplifier: number): number {
        const distance = Math.abs(endPos - linePos);
        const direction = distance === 0 ? 0 : (endPos - linePos) / distance;

        // Base speed: 0.5 pixels per millisecond
        const baseSpeed = 0.5;
        let moveAmount = baseSpeed * speedAmplifier * timeDelta;

        if (moveAmount > distance) {
            moveAmount = distance;
        } else if (moveAmount < 1 && distance > 0) {
            // Ensure minimum movement to prevent getting stuck
            moveAmount = 1;
        }

        return moveAmount * direction;
    },

    wait(waitTime: number, timeDelta: number, speedAmplifier: number): number {
        const nextWaitTime = (waitTime - timeDelta * speedAmplifier);
        if (nextWaitTime > 0) {
            return nextWaitTime;
        } else {
            return 0;
        }
    }
};
