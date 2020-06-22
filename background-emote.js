class BackgroundEmotes {
    constructor(moustacheIndex = 2) {
        this.emoteTextures = [];
        this.backgroundGradient = null;

        this.moustacheIndex = moustacheIndex;
    }

    load() {
        this.emoteTextures[0] = new Image();
        this.emoteTextures[1] = new Image();
        this.emoteTextures[2] = new Image();
        this.emoteTextures[3] = new Image();
        this.emoteTextures[4] = new Image();
        this.emoteTextures[0].src = './emojis/emoji_smile.svg';
        this.emoteTextures[1].src = './emojis/emoji_sceptic.svg';
        this.emoteTextures[0].src = './emojis/emoji_suprised.svg';
        this.emoteTextures[3].src = './emojis/emoji_shocked.svg';
        this.emoteTextures[0].src = './emojis/emoji_grin.svg';

        this.backgroundGradient = context.createLinearGradient(0, 0, 0, 600);
        this.backgroundGradient.addColorStop(0, 'rgba(226,226,226, 1)');
        this.backgroundGradient.addColorStop(0.5, 'rgba(219,219,219,1)');
        this.backgroundGradient.addColorStop(0.51, 'rgba(209,209,209,1)');
        this.backgroundGradient.addColorStop(1, 'rgba(254,254,254,1)');

        switch(this.moustacheIndex) {
            case 1:
                this.emotePosition = { x: 0, y: -34 };
                this.emoteSize = 600;
                break;

            case 2:
                this.emotePosition = { x: 50, y: -30 };
                this.emoteSize = 500;
                break;
            case 3:
                this.emotePosition = { x: 0, y: -10 };
                this.emoteSize = 600;
                break;
        }
    }

    render() {
        let textureToUse;
        let currentScore = walls.getScore();
    
        if (currentScore < 3) {
            textureToUse = this.emoteTextures[0];
        } else if (currentScore < 6) {
            textureToUse = this.emoteTextures[1];
        } else if (currentScore < 12) {
            textureToUse = this.emoteTextures[2];
        } else if (currentScore < 18) {
            textureToUse = this.emoteTextures[3];
        } else {
            textureToUse = this.emoteTextures[4];
        }
    
        context.drawImage(textureToUse, this.emotePosition.x, this.emotePosition.y, this.emoteSize, this.emoteSize);
    }

}