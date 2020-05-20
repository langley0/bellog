export default function normalize(src: string): string {
    return src.replace(/\r\n?|\n/g, "\n");
}