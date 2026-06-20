export enum TokenType {
    Text,

    Star,
    Underscore,

    Hash,

    NewLine,
    EOF
}

export interface Token {
    type: TokenType;
    value: string;
    start: number; 
    end: number; 
}

export function token(type: TokenType, value: string, start: number, end: number): Token {
    return {
        type,
        value,
        start,
        end
    }
}

export function tokenize(input: string): Token[] {
    // Technically, it is a mutable array!!!
    const tokens: Token[] = []

    for (let i = 0; i < input.length; ) {
        const char = input.charAt(i)

        if (char === "*") {
            tokens.push(token(TokenType.Star, char, i, i + 1))
            i++
        } else if (char === "_") {
            tokens.push(token(TokenType.Underscore, char, i, i + 1))
            i++
        } else if (char === "#") {
            tokens.push(token(TokenType.Hash, char, i, i + 1))
            i++
        } else if (char === "\n") {
            tokens.push(token(TokenType.NewLine, char, i, i + 1))
            i++
        } else if (char === " ") {
            i++
        } else {
            const start = i
            while (i < input.length && !["*", "_", "#", "\n"].includes(input.charAt(i))) {
                i++
            }
            tokens.push(token(TokenType.Text, input.slice(start, i), start, i))
        }
    }

    return tokens
}