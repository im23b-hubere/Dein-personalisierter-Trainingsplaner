print('Dieses Programm wurde geschrieben von Eric Huber.')
print('Finde heraus, welches Programm am besten für dich geeignet ist!')

programm_start = input('Möchtest du beginnen? (ja/nein): ').strip().lower()
if programm_start not in ['ja', 'yes']:
    print('Schade, dann nächstes Mal!')
    exit()

print('Perfekt, lass uns beginnen!')

print("Wie oft pro Woche möchtest du trainieren?")
print("1. 2-3 Tage")
print("2. 3-4 Tage")
print("3. 5-6 Tage")
try:
    wahl_tage = int(input('Bitte wähle eine Option (1, 2 oder 3): '))
except ValueError:
    print('Ungültige Eingabe. Bitte starte das Programm erneut.')
    exit()

print('Was ist dein Hauptziel?')
print('1. Muskelaufbau')
print('2. Fettabbau')
print('3. Allgemeine Fitness')
try:
    wahl_ziel = int(input('Bitte wähle eine Option (1, 2 oder 3): '))
except ValueError:
    print('Ungültige Eingabe. Bitte starte das Programm erneut.')
    exit()

print('Als was würdest du dich identifizieren?')
print('1. Anfänger')
print('2. Fortgeschritten')
print('3. Experte')
try:
    wahl_level = int(input('Bitte wähle eine Option (1, 2 oder 3): '))
except ValueError:
    print('Ungültige Eingabe. Bitte starte das Programm erneut.')
    exit()

print('Wie viel Zeit kannst du pro Trainingseinheit aufwenden?')
print('1. 30-60 Minuten')
print('2. 1-2 Stunden')
print('3. > 2 Stunden')
try:
    wahl_length = int(input('Bitte wähle eine Option (1, 2 oder 3): '))
except ValueError:
    print('Ungültige Eingabe. Bitte starte das Programm erneut.')
    exit()

if wahl_tage == 1:
    if wahl_ziel == 1:
        if wahl_level == 1:
            if wahl_length == 1:
                plan = 'Ganzkörpertraining für Anfänger mit kurzen Einheiten, 2-3 Tage pro Woche.'
            else:
                plan = 'Ganzkörpertraining für Anfänger, 2-3 Tage pro Woche.'
        else:
            if wahl_length == 1:
                plan = 'Ober-/Unterkörper-Split mit kurzen Einheiten, 2-3 Tage pro Woche.'
            else:
                plan = 'Ober-/Unterkörper-Split, 2-3 Tage pro Woche.'
    elif wahl_ziel == 2:
        plan = 'HIIT kombiniert mit Ganzkörpertraining, 2-3 Tage pro Woche.'
    else:
        plan = 'Allgemeines Fitnessprogramm, 2-3 Tage pro Woche.'

elif wahl_tage == 2:
    if wahl_ziel == 1:
        if wahl_level == 1:
            plan = 'Ober-/Unterkörper-Split für Anfänger, 3-4 Tage pro Woche.'
        elif wahl_level == 2:
            if wahl_length == 1:
                plan = 'Push/Pull/Legs (PPL) mit kurzen Einheiten, 3-4 Tage pro Woche.'
            else:
                plan = 'Push/Pull/Legs (PPL), 3-4 Tage pro Woche.'
        else:
            plan = 'Push/Pull/Legs (PPL), 3-4 Tage pro Woche.'
    elif wahl_ziel == 2:
        plan = 'Kombination aus HIIT und Ober-/Unterkörper-Training, 3-4 Tage pro Woche.'
    else:
        plan = 'Allgemeines Fitnessprogramm, 3-4 Tage pro Woche.'

elif wahl_tage == 3:
    if wahl_ziel == 1:
        if wahl_level == 3:
            if wahl_length == 2:
                plan = 'Arnold Split oder Bro-Split, 5-6 Tage pro Woche.'
            else:
                plan = 'Intensiver Arnold Split, 5-6 Tage pro Woche.'
        elif wahl_level == 2:
            plan = 'Push/Pull/Legs (PPL), 5-6 Tage pro Woche.'
        else:
            plan = 'Ganzkörpertraining oder Ober-/Unterkörper-Split, 5-6 Tage pro Woche.'
    elif wahl_ziel == 2:
        if wahl_length == 1:
            plan = 'HIIT und Ober-/Unterkörper-Training, 5-6 Tage pro Woche.'
        else:
            plan = 'Kombination aus Cardio und Krafttraining, 5-6 Tage pro Woche.'
    else:
        plan = 'Allgemeines Fitnessprogramm, 5-6 Tage pro Woche.'

else:
    print('Ungültige Eingabe, bitte starte das Programm erneut und wähle eine gültige Option.')
    exit()

print(f'Empfehlung: {plan}')

print('\nErklärung zum empfohlenen Plan:')
if 'Ganzkörpertraining' in plan:
    print('Ein Ganzkörpertraining ist ideal für Anfänger und bietet eine gleichmäßige Stärkung des gesamten Körpers. Es erfordert weniger Zeit pro Woche und fördert eine ausgeglichene Entwicklung.')
elif 'Push/Pull/Legs' in plan:
    print('Push/Pull/Legs (PPL) ist ein Split-Programm, das Muskelgruppen nach Bewegungsmustern trennt. Es ist effizient für Fortgeschrittene und bietet eine gute Balance zwischen Intensität und Erholung.')
elif 'Arnold Split' in plan or 'Bro-Split' in plan:
    print('Der Arnold Split oder Bro-Split teilt das Training auf einzelne Muskelgruppen auf und ist für erfahrene Athleten geeignet, die viel Zeit pro Woche investieren können.')
elif 'HIIT' in plan:
    print('HIIT (High-Intensity Interval Training) kombiniert kurze, intensive Übungen mit Erholungsphasen. Es ist effektiv für Fettabbau und Verbesserung der Kondition.')
else:
    print('Ein allgemeines Fitnessprogramm fokussiert sich auf ein ganzheitliches Training, das Kraft, Ausdauer und Beweglichkeit fördert.')
