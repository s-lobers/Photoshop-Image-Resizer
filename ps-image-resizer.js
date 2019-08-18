//////////////////////////////
// Image-Resizer by Lobers //
////////////////////////////

var doc = app.activeDocument; 

// QUELLDATEI
var QuelldateiStr = doc.toString(); // Neue Variable mit aktuellem Dateinamen als String generiert (Damit am Ende die Originaldatei verschoben werden kann, weil sich die Dateiendung zum Schluss ändern würde und das Original dann nicht mehr gefunden werden würde)
var QuelldateiName = QuelldateiStr.replace("[Document ", "").replace(/]/g, ""); // Entfernt Teil des Strings (Überbleibsel "[Document" und "]" von app.activeDocument, sodass nur der tatsächliche Dateiname mit Endung übrig bleibt)
var Quelldatei = new File ("Ablageort/der/Ausgangs-Bilddatei"+QuelldateiName); // Erstelle fertiges/endgültiges Quelldatei-Objekt (Dateiname.Endung)

// ZIELORDNER UND ERLEDIGT-ORDNER DEFINIEREN
var Zielordner = new Folder("Speicherziel/hier/eingeben");
var Erledigt = new Folder("Verzeichnis/fuer/abgearbeitete/Ausgangs-Bilder/angeben");

// SPEICHERVORGANG DEFINIEREN
var saveFile = new File (Zielordner);

function savePNG(saveFile){  
	pngSaveFile = new File(saveFile);  
	var pngSaveOptions = new PNGSaveOptions(); 
	pngSaveOptions.compression=0; // Keine Kompression
	pngSaveOptions.interlaced=false; // Nicht Interlaced
	pngSaveOptions.quality = 100;
	pngSaveOptions.transparency = true;
	activeDocument.saveAs(saveFile, pngSaveOptions, false, Extension.LOWERCASE);  // false steht hier für die Option "als Kopie speichern", in diesem Fall ausgeschaltet 
}  

// BILDBEARBEITUNG/ZUSCHNITT UND GRÖSSENANPASSUNG
if (doc.height > doc.width){  
	doc.resizeImage(undefined, UnitValue(800, "px"), 150, ResampleMethod.BICUBIC);  // Wenn Dokumenthöhe größer als Dokumentbreite, Höhe auf 800 Pixel bringen
	doc.resizeCanvas(new UnitValue(800,'px'),new UnitValue(800,'px'), AnchorPosition.MIDDLECENTER);  // Arbeitsfläche links und rechts auf 800px bringen
}
else{  
	doc.resizeImage(new UnitValue(800, "px"), undefined, 150, ResampleMethod.BICUBIC) // Wenn Dokumentbreite größer als Dokumenthöhe, Breite auf 800px bringen
	doc.resizeCanvas(new UnitValue(800,'px'),new UnitValue(800,'px'), AnchorPosition.MIDDLECENTER);   // Arbeitsfläche oben und unten auf 800px bringen
} 

// SPEICHERN DER FERTIGEN BILDER UND VERSCHIEBEN DER ORIGINALE
saveFile.remove(); // Falls Datei bereits vorhanden, dann löschen
savePNG(saveFile);
Quelldatei.copy(decodeURI(Erledigt+"/"+QuelldateiName)); // Quelldatei in Erledigt-Ordner kopieren
Quelldatei.remove(decodeURI(Quelldatei)); // Quelldatei aus Originale-Ordner löschen
doc.close(SaveOptions.DONOTSAVECHANGES);