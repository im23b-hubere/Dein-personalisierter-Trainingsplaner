def get_user_input(prompt, options, max_choice):
    """Hilfsfunktion für Benutzereingaben mit Fehlerbehandlung"""
    while True:
        print(prompt)
        for i, option in enumerate(options, 1):
            print(f"{i}. {option}")
        
        try:
            choice = int(input(f'Bitte wähle eine Option (1-{max_choice}): '))
            if 1 <= choice <= max_choice:
                return choice
            else:
                print(f'Bitte wähle eine Zahl zwischen 1 und {max_choice}.')
        except ValueError:
            print('Bitte gib eine gültige Zahl ein.')

def get_detailed_training_plan(training_days, goal, level, duration):
    """Erstellt einen detaillierten Trainingsplan mit konkreten Übungen"""
    
    # Grundlegende Übungen für verschiedene Muskelgruppen
    exercises = {
        'push': ['Liegestütze', 'Dips', 'Schulterdrücken', 'Trizeps-Dips'],
        'pull': ['Klimmzüge', 'Rudern', 'Lat-Zug', 'Bizeps-Curls'],
        'legs': ['Kniebeugen', 'Ausfallschritte', 'Kreuzheben', 'Wadenheben'],
        'core': ['Planks', 'Crunches', 'Russian Twists', 'Mountain Climbers'],
        'cardio': ['Joggen', 'Burpees', 'Jumping Jacks', 'Mountain Climbers'],
        'full_body': ['Burpees', 'Mountain Climbers', 'Jumping Jacks', 'Liegestütze', 'Kniebeugen']
    }
    
    # Trainingsplan basierend auf den Eingaben
    if training_days == 1:  # 2-3 Tage
        if goal == 1:  # Muskelaufbau
            if level == 1:  # Anfänger
                if duration == 1:  # 30-60 Minuten
                    return create_full_body_plan(2, exercises, "Anfänger", "kurz")
                else:
                    return create_full_body_plan(3, exercises, "Anfänger", "normal")
            else:  # Fortgeschritten/Experte
                if duration == 1:  # 30-60 Minuten
                    return create_split_plan(2, exercises, "Ober-/Unterkörper", "kurz")
                else:
                    return create_split_plan(3, exercises, "Ober-/Unterkörper", "normal")
        elif goal == 2:  # Fettabbau
            return create_hiit_plan(3, exercises, duration)
        else:  # Allgemeine Fitness
            return create_fitness_plan(3, exercises, duration)

    elif training_days == 2:  # 3-4 Tage
        if goal == 1:  # Muskelaufbau
            if level == 1:  # Anfänger
                return create_split_plan(3, exercises, "Ober-/Unterkörper", "normal")
            elif level == 2:  # Fortgeschritten
                if duration == 1:  # 30-60 Minuten
                    return create_ppl_plan(3, exercises, "kurz")
                else:
                    return create_ppl_plan(4, exercises, "normal")
            else:  # Experte
                return create_ppl_plan(4, exercises, "normal")
        elif goal == 2:  # Fettabbau
            return create_hiit_plan(4, exercises, duration)
        else:  # Allgemeine Fitness
            return create_fitness_plan(4, exercises, duration)

    elif training_days == 3:  # 5-6 Tage
        if goal == 1:  # Muskelaufbau
            if level == 3:  # Experte
                if duration == 2:  # 1-2 Stunden
                    return create_arnold_split(5, exercises)
                else:
                    return create_arnold_split(6, exercises)
            elif level == 2:  # Fortgeschritten
                return create_ppl_plan(5, exercises, "normal")
            else:  # Anfänger
                return create_split_plan(5, exercises, "Ober-/Unterkörper", "normal")
        elif goal == 2:  # Fettabbau
            if duration == 1:  # 30-60 Minuten
                return create_hiit_plan(5, exercises, duration)
            else:
                return create_cardio_strength_plan(5, exercises, duration)
        else:  # Allgemeine Fitness
            return create_fitness_plan(5, exercises, duration)

def create_full_body_plan(days, exercises, level, duration):
    """Erstellt einen Ganzkörpertrainingsplan"""
    plan = {
        'name': f'Ganzkörpertraining für {level}',
        'days_per_week': days,
        'description': f'Ein ausgewogenes Ganzkörpertraining {days} mal pro Woche',
        'workouts': {}
    }
    
    # Übungen für Ganzkörpertraining
    workout_exercises = [
        ('Kniebeugen', 3, '8-12'),
        ('Liegestütze', 3, '8-15'),
        ('Rudern', 3, '8-12'),
        ('Schulterdrücken', 3, '8-12'),
        ('Planks', 3, '30-60 Sek'),
        ('Ausfallschritte', 3, '10-15 pro Bein')
    ]
    
    if duration == "kurz":
        workout_exercises = workout_exercises[:4]  # Weniger Übungen für kurze Einheiten
    
    for day in range(1, days + 1):
        plan['workouts'][f'Tag {day}'] = {
            'name': f'Ganzkörpertraining Tag {day}',
            'exercises': workout_exercises,
            'rest_days': '1-2 Tage Pause zwischen den Einheiten'
        }
    
    return plan

def create_split_plan(days, exercises, split_type, duration):
    """Erstellt einen Split-Trainingsplan"""
    plan = {
        'name': f'{split_type}-Split',
        'days_per_week': days,
        'description': f'{split_type}-Training {days} mal pro Woche',
        'workouts': {}
    }
    
    if split_type == "Ober-/Unterkörper":
        upper_body = [
            ('Liegestütze', 3, '8-12'),
            ('Schulterdrücken', 3, '8-12'),
            ('Rudern', 3, '8-12'),
            ('Trizeps-Dips', 3, '8-12'),
            ('Bizeps-Curls', 3, '8-12')
        ]
        
        lower_body = [
            ('Kniebeugen', 3, '8-12'),
            ('Ausfallschritte', 3, '10-15 pro Bein'),
            ('Kreuzheben', 3, '8-12'),
            ('Wadenheben', 3, '15-20'),
            ('Planks', 3, '30-60 Sek')
        ]
        
        if duration == "kurz":
            upper_body = upper_body[:3]
            lower_body = lower_body[:3]
        
        for day in range(1, days + 1):
            if day % 2 == 1:  # Ungerade Tage
                plan['workouts'][f'Tag {day}'] = {
                    'name': f'Oberkörper Tag {day}',
                    'exercises': upper_body,
                    'rest_days': '1 Tag Pause'
                }
            else:  # Gerade Tage
                plan['workouts'][f'Tag {day}'] = {
                    'name': f'Unterkörper Tag {day}',
                    'exercises': lower_body,
                    'rest_days': '1 Tag Pause'
                }
    
    return plan

def create_ppl_plan(days, exercises, duration):
    """Erstellt einen Push/Pull/Legs Plan"""
    plan = {
        'name': 'Push/Pull/Legs (PPL)',
        'days_per_week': days,
        'description': f'PPL-Training {days} mal pro Woche',
        'workouts': {}
    }
    
    push_exercises = [
        ('Liegestütze', 3, '8-12'),
        ('Schulterdrücken', 3, '8-12'),
        ('Trizeps-Dips', 3, '8-12'),
        ('Dips', 3, '8-12')
    ]
    
    pull_exercises = [
        ('Klimmzüge', 3, '5-10'),
        ('Rudern', 3, '8-12'),
        ('Lat-Zug', 3, '8-12'),
        ('Bizeps-Curls', 3, '8-12')
    ]
    
    legs_exercises = [
        ('Kniebeugen', 3, '8-12'),
        ('Ausfallschritte', 3, '10-15 pro Bein'),
        ('Kreuzheben', 3, '8-12'),
        ('Wadenheben', 3, '15-20')
    ]
    
    if duration == "kurz":
        push_exercises = push_exercises[:2]
        pull_exercises = pull_exercises[:2]
        legs_exercises = legs_exercises[:2]
    
    workout_types = ['Push', 'Pull', 'Legs']
    for day in range(1, days + 1):
        workout_type = workout_types[(day - 1) % 3]
        if workout_type == 'Push':
            exercises_list = push_exercises
        elif workout_type == 'Pull':
            exercises_list = pull_exercises
        else:
            exercises_list = legs_exercises
            
        plan['workouts'][f'Tag {day}'] = {
            'name': f'{workout_type} Tag {day}',
            'exercises': exercises_list,
            'rest_days': '1 Tag Pause nach jedem Zyklus'
        }
    
    return plan

def create_hiit_plan(days, exercises, duration):
    """Erstellt einen HIIT-Trainingsplan"""
    plan = {
        'name': 'HIIT-Training',
        'days_per_week': days,
        'description': f'High-Intensity Interval Training {days} mal pro Woche',
        'workouts': {}
    }
    
    hiit_exercises = [
        ('Burpees', 4, '30 Sek Arbeit / 30 Sek Pause'),
        ('Mountain Climbers', 4, '30 Sek Arbeit / 30 Sek Pause'),
        ('Jumping Jacks', 4, '30 Sek Arbeit / 30 Sek Pause'),
        ('High Knees', 4, '30 Sek Arbeit / 30 Sek Pause'),
        ('Plank Jacks', 4, '30 Sek Arbeit / 30 Sek Pause')
    ]
    
    if duration == 1:  # Kurze Einheiten
        hiit_exercises = hiit_exercises[:3]
    
    for day in range(1, days + 1):
        plan['workouts'][f'Tag {day}'] = {
            'name': f'HIIT Tag {day}',
            'exercises': hiit_exercises,
            'rest_days': '1 Tag Pause zwischen HIIT-Einheiten',
            'warmup': '5-10 Minuten leichtes Aufwärmen',
            'cooldown': '5-10 Minuten Stretching'
        }
    
    return plan

def create_fitness_plan(days, exercises, duration):
    """Erstellt einen allgemeinen Fitnessplan"""
    plan = {
        'name': 'Allgemeines Fitnessprogramm',
        'days_per_week': days,
        'description': f'Ausgewogenes Training {days} mal pro Woche',
        'workouts': {}
    }
    
    fitness_exercises = [
        ('Kniebeugen', 3, '10-15'),
        ('Liegestütze', 3, '8-12'),
        ('Planks', 3, '30-60 Sek'),
        ('Ausfallschritte', 3, '10 pro Bein'),
        ('Mountain Climbers', 3, '20-30'),
        ('Jumping Jacks', 3, '30 Sek')
    ]
    
    if duration == 1:  # Kurze Einheiten
        fitness_exercises = fitness_exercises[:4]
    
    for day in range(1, days + 1):
        plan['workouts'][f'Tag {day}'] = {
            'name': f'Fitness Tag {day}',
            'exercises': fitness_exercises,
            'rest_days': '1-2 Tage Pause',
            'warmup': '5-10 Minuten Aufwärmen',
            'cooldown': '5-10 Minuten Stretching'
        }
    
    return plan

def create_arnold_split(days, exercises):
    """Erstellt einen Arnold Split für Experten"""
    plan = {
        'name': 'Arnold Split',
        'days_per_week': days,
        'description': f'Intensiver Split für Experten {days} mal pro Woche',
        'workouts': {}
    }
    
    chest_back = [
        ('Liegestütze', 4, '8-12'),
        ('Klimmzüge', 4, '6-10'),
        ('Dips', 4, '8-12'),
        ('Rudern', 4, '8-12'),
        ('Schulterdrücken', 3, '8-12')
    ]
    
    shoulders_arms = [
        ('Schulterdrücken', 4, '8-12'),
        ('Trizeps-Dips', 4, '8-12'),
        ('Bizeps-Curls', 4, '8-12'),
        ('Seitheben', 3, '10-15'),
        ('Hammer Curls', 3, '8-12')
    ]
    
    legs = [
        ('Kniebeugen', 4, '8-12'),
        ('Kreuzheben', 4, '6-10'),
        ('Ausfallschritte', 3, '10-15 pro Bein'),
        ('Wadenheben', 4, '15-20'),
        ('Beinpresse', 3, '10-15')
    ]
    
    workout_types = ['Chest/Back', 'Shoulders/Arms', 'Legs']
    for day in range(1, days + 1):
        workout_type = workout_types[(day - 1) % 3]
        if workout_type == 'Chest/Back':
            exercises_list = chest_back
        elif workout_type == 'Shoulders/Arms':
            exercises_list = shoulders_arms
        else:
            exercises_list = legs
            
        plan['workouts'][f'Tag {day}'] = {
            'name': f'{workout_type} Tag {day}',
            'exercises': exercises_list,
            'rest_days': '1 Tag Pause nach jedem Zyklus'
        }
    
    return plan

def create_cardio_strength_plan(days, exercises, duration):
    """Erstellt einen Cardio-Kraft-Kombinationsplan"""
    plan = {
        'name': 'Cardio-Kraft-Kombination',
        'days_per_week': days,
        'description': f'Kombination aus Cardio und Krafttraining {days} mal pro Woche',
        'workouts': {}
    }
    
    for day in range(1, days + 1):
        if day % 2 == 1:  # Ungerade Tage - Kraft
            plan['workouts'][f'Tag {day}'] = {
                'name': f'Krafttraining Tag {day}',
                'exercises': [
                    ('Kniebeugen', 3, '8-12'),
                    ('Liegestütze', 3, '8-12'),
                    ('Rudern', 3, '8-12'),
                    ('Planks', 3, '30-60 Sek')
                ],
                'rest_days': '1 Tag Pause'
            }
        else:  # Gerade Tage - Cardio
            plan['workouts'][f'Tag {day}'] = {
                'name': f'Cardio Tag {day}',
                'exercises': [
                    ('Joggen', 1, '20-30 Minuten'),
                    ('Burpees', 3, '30 Sek'),
                    ('Jumping Jacks', 3, '30 Sek'),
                    ('Mountain Climbers', 3, '30 Sek')
                ],
                'rest_days': '1 Tag Pause'
            }
    
    return plan

def display_training_plan(plan):
    """Zeigt den detaillierten Trainingsplan an"""
    print('\n' + '=' * 60)
    print(f'🎉 DEIN DETAILLIERTER TRAININGSPLAN')
    print('=' * 60)
    print(f'📋 Plan: {plan["name"]}')
    print(f'📅 Trainingstage pro Woche: {plan["days_per_week"]}')
    print(f'📝 Beschreibung: {plan["description"]}')
    
    print('\n🏋️ WÖCHENTLICHER TRAININGSPLAN:')
    print('=' * 60)
    
    for day, workout in plan['workouts'].items():
        print(f'\n📅 {workout["name"]}')
        print('-' * 40)
        
        if 'warmup' in workout:
            print(f'🔥 Aufwärmen: {workout["warmup"]}')
        
        print('💪 Übungen:')
        for i, (exercise, sets, reps) in enumerate(workout['exercises'], 1):
            print(f'   {i}. {exercise}: {sets} Sätze à {reps}')
        
        if 'cooldown' in workout:
            print(f'🧘 Abkühlen: {workout["cooldown"]}')
        
        print(f'⏸️  Pause: {workout["rest_days"]}')
    
    print('\n💡 TIPPS FÜR ERFOLG:')
    print('=' * 60)
    print('• Führe jede Übung mit korrekter Technik aus')
    print('• Steigere die Gewichte/Intensität langsam')
    print('• Höre auf deinen Körper und gönne dir ausreichend Pause')
    print('• Bleibe konsistent - Regelmäßigkeit ist der Schlüssel')
    print('• Ernähre dich ausgewogen und trinke genug Wasser')

def explain_plan(plan):
    """Erklärt den empfohlenen Trainingsplan"""
    print('\n📋 Erklärung zum empfohlenen Plan:')
    print('=' * 50)
    
    plan_name = plan['name'].lower()
    
    if 'ganzkörpertraining' in plan_name:
        print('🏋️ Ein Ganzkörpertraining ist ideal für Anfänger und bietet eine gleichmäßige Stärkung des gesamten Körpers.')
        print('   • Erfordert weniger Zeit pro Woche')
        print('   • Fördert eine ausgeglichene Entwicklung')
        print('   • Perfekt für den Einstieg ins Krafttraining')
    elif 'push/pull/legs' in plan_name or 'ppl' in plan_name:
        print('💪 Push/Pull/Legs (PPL) ist ein Split-Programm, das Muskelgruppen nach Bewegungsmustern trennt.')
        print('   • Effizient für Fortgeschrittene')
        print('   • Gute Balance zwischen Intensität und Erholung')
        print('   • Push: Brust, Schultern, Trizeps')
        print('   • Pull: Rücken, Bizeps')
        print('   • Legs: Beine, Gesäß')
    elif 'arnold split' in plan_name:
        print('🔥 Der Arnold Split teilt das Training auf einzelne Muskelgruppen auf.')
        print('   • Für erfahrene Athleten geeignet')
        print('   • Erfordert viel Zeit pro Woche')
        print('   • Maximale Intensität pro Muskelgruppe')
    elif 'hiit' in plan_name:
        print('⚡ HIIT (High-Intensity Interval Training) kombiniert kurze, intensive Übungen mit Erholungsphasen.')
        print('   • Effektiv für Fettabbau')
        print('   • Verbessert die Kondition')
        print('   • Zeitlich effizient')
    elif 'cardio' in plan_name:
        print('🏃‍♂️ Cardio-Kraft-Kombination verbindet Ausdauer- und Krafttraining.')
        print('   • Ausgewogener Ansatz')
        print('   • Verbessert sowohl Kraft als auch Ausdauer')
        print('   • Ideal für allgemeine Fitness')
    else:
        print('🌟 Ein allgemeines Fitnessprogramm fokussiert sich auf ein ganzheitliches Training.')
        print('   • Fördert Kraft, Ausdauer und Beweglichkeit')
        print('   • Ausgewogener Ansatz')
        print('   • Geeignet für alle Fitnesslevel')

def main():
    """Hauptfunktion des Programms"""
    print('🏋️ Dein personalisierter Trainingsplaner')
    print('=' * 40)
    print('Dieses Programm wurde geschrieben von Eric Huber.')
    print('Finde heraus, welches Programm am besten für dich geeignet ist!')
    print()

    while True:
        # Start des Programms
        start_choice = input('Möchtest du beginnen? (ja/nein): ').strip().lower()
        if start_choice not in ['ja', 'yes', 'j', 'y']:
            print('Schade, dann nächstes Mal! 👋')
            break

        print('\n🎯 Perfekt, lass uns deinen perfekten Trainingsplan erstellen!')
        print()

        # Benutzereingaben sammeln
        training_days_options = ['2-3 Tage', '3-4 Tage', '5-6 Tage']
        training_days = get_user_input("Wie oft pro Woche möchtest du trainieren?", training_days_options, 3)

        goal_options = ['Muskelaufbau', 'Fettabbau', 'Allgemeine Fitness']
        goal = get_user_input('Was ist dein Hauptziel?', goal_options, 3)

        level_options = ['Anfänger', 'Fortgeschritten', 'Experte']
        level = get_user_input('Als was würdest du dich identifizieren?', level_options, 3)

        duration_options = ['30-60 Minuten', '1-2 Stunden', '> 2 Stunden']
        duration = get_user_input('Wie viel Zeit kannst du pro Trainingseinheit aufwenden?', duration_options, 3)

        # Detaillierten Trainingsplan erstellen
        plan = get_detailed_training_plan(training_days, goal, level, duration)

        # Plan anzeigen
        display_training_plan(plan)
        
        # Plan erklären
        explain_plan(plan)

        # Weitere Optionen
        print('\n' + '=' * 50)
        restart = input('\nMöchtest du einen neuen Plan erstellen? (ja/nein): ').strip().lower()
        if restart not in ['ja', 'yes', 'j', 'y']:
            print('Viel Erfolg mit deinem Trainingsplan! 💪')
            break
        print('\n' + '=' * 50 + '\n')

if __name__ == "__main__":
    main()
