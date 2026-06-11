class keySigniture {
    constructor(notes, name) {
        this.notes = notes;
        this.name = name;
    }
}
export const keys = {
    // Natural keys
    C: new keySigniture(["C", "D", "E", "F", "G", "A", "B"], "C"),
    G: new keySigniture(["G", "A", "B", "C", "D", "E", "F♯"], "G"),
    D: new keySigniture(["D", "E", "F♯", "G", "A", "B", "C♯"], "D"),
    A: new keySigniture(["A", "B", "C♯", "D", "E", "F♯", "G♯"], "A"),
    E: new keySigniture(["E", "F♯", "G♯", "A", "B", "C♯", "D♯"], "E"),
    B: new keySigniture(["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"], "B"),
    F: new keySigniture(["F", "G", "A", "B♭", "C", "D", "E"], "F"),

    // Sharp keys
    CS: new keySigniture(["C♯", "D♯", "E♯", "F♯", "G♯", "A♯", "B♯"], "C♯"),
    DS: new keySigniture(["D♯", "E♯", "F♯♯", "G♯", "A♯", "B♯", "C♯♯"], "D♯"),
    FS: new keySigniture(["F♯", "G♯", "A♯", "B", "C♯", "D♯", "E♯"], "F♯"),
    GS: new keySigniture(["G♯", "A♯", "B♯", "C♯", "D♯", "E♯", "F♯♯"], "G♯"),
    AS: new keySigniture(["A♯", "B♯", "C♯♯", "D♯", "E♯", "F♯♯", "G♯♯"], "A♯"),

    // Flat keys
    BF: new keySigniture(["B♭", "C", "D", "E♭", "F", "G", "A"], "B♭"),
    EF: new keySigniture(["E♭", "F", "G", "A♭", "B♭", "C", "D"], "E♭"),
    AF: new keySigniture(["A♭", "B♭", "C", "D♭", "E♭", "F", "G"], "A♭"),
    DF: new keySigniture(["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"], "D♭"),
    GF: new keySigniture(["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F"], "G♭"),
    CF: new keySigniture(["C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "B♭"], "C♭")
};
