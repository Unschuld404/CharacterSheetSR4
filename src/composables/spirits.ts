import {toArray, toBool, toInt} from "@/composables/utils";
import type {IdObject, Skill} from "@/composables/types";
import {char} from "@/composables/char";

export type SpiritType = {
    name: string;
    english_name: string;
    modifiers : Modifier[];
    skills: string;
    powers: string;
    optional: string;
    movement: string;
    flaws: string;
}

export type SpiritInitiative = {
    pool: number;
    passes: number;
}

export const BoundModes = [
    { label: 'Gebunden', value: 'gebunden' },
    { label: 'Ungebunden', value: 'ungebunden' },
];

export const SpiritPlanes = [
    { label: 'Materiell', value: 'material' },
    { label: 'Astral', value: 'astral' },
    { label: 'Heimat', value: 'heimat' },
];

export class Spirit implements IdObject {
    static nextId: number = 0;
    id: number = 0;

    type: string = 'unknown';
    name: string = '';
    services: number = 0;
    force: number = 1;
    bound: boolean = false;
    created: boolean = true;
    optionalPowers: string[] = [];
    plane: string = 'heimat';
    spentEdge: number = 0;

    get valid(): boolean { return this.spiritType !== null }
    get spiritType(): SpiritType | null { return SpiritTypes.find((item: SpiritType) => { return item.name === this.type }) ?? null };
    set spiritType(value: SpiritType) { this.type = value.name }
    get caption(): string { return (this.name ?? '') || this.type }
    get maxOptionalPowersCount(): number { return Math.floor(this.force / 3) }
    get optionalPowersCount(): number { return this.optionalPowers.length }
    get powers(): SpiritPower[] {
        const powersAsStringArray = this.optionalPowers.concat(toArray(this.spiritType?.powers ?? null));
        return powersAsStringArrayToPowers(powersAsStringArray);
    }
    get skills(): Skill[] {
        const skills: Skill[]  = [];
        const skillsAsString: string[] = toArray(this.spiritType?.skills ?? null);
        for (const skillAsString of skillsAsString) {
            let skill = null;
            if (skillAsString == 'Exotische Fernkampfwaffe')
            {
                skill = {
                    name: 'Exotische Fernkampfwaffe',
                    type: 'Körperliche Aktionsfertigkeiten',
                    attribute: 'AGI',
                    attribute_value: this.attributeTotal('AGI'),
                    rating: this.force,
                    total: this.force + this.attributeTotal('AGI'),
                }
            }
            else
            {
                let charSkill = char.actionSkills.find((item: Skill) => { return item.name === skillAsString })
                    ?? char.knowledgeSkills.find((item: Skill) => { return item.name === skillAsString })
                    ?? null;

                if (charSkill !== null)
                {
                    skill = {
                        name: charSkill.name,
                        type: charSkill.type,
                        attribute: charSkill.attribute,
                        attribute_value: this.attributeTotal(charSkill.attribute),
                        rating: this.force,
                        total: this.force + this.attributeTotal(charSkill.attribute),
                    };
                }
            }

            if (skill !== null)
            {
                skills.push(skill);
            }
            else
            {
                console.error('skill not found: ' + skillAsString);
            }

        }

        return skills;
    }
    get armor(): number { return this.force * 2 }
    get initiative() : SpiritInitiative {
        if (this.plane === 'material') {
            return {
                pool : this.force * 2 + 2,
                passes: 2,
            }
        }
        else
        {
            return {
                pool : this.force * 2,
                passes: 3,
            }
        }
    }
    get edgeMax(): number { return this.attributeTotal('EDG') }
    get edge(): number { return this.edgeMax - this.spentEdge}
    set edge(value: number) { this.spentEdge = this.edgeMax - value; }

    setNextId(): Spirit
    {
        this.id = Spirit.nextId++;
        return this;
    }

    generateId(): string {
        return this.type
            + '.' + this.name
            + '.' + this.id;
    }
    equals(spirit: Spirit): boolean {
        return this.type === spirit.type
            && this.name === spirit.name
            && this.force === spirit.force
            && this.services === spirit.services
            && this.created === spirit.created
            && this.bound === spirit.bound;
    }

    attributeTotal(attribute: string): number {
        if (this.plane === 'material' || attribute == 'EDG' || attribute == 'INI')
        {
            const mod = this.spiritType?.modifiers?.find((item: Modifier) => { return item.name === attribute }) ?? null;
            if (mod !== null)
            {
                return this.force + mod.value
            }
        }
        return this.force;
    }

    static create(type: SpiritType, force: number, services: number): Spirit {
        const newSpirit: Spirit = new Spirit();
        newSpirit.setNextId();
        newSpirit.spiritType = type;
        newSpirit.force = force;
        newSpirit.services = services;
        return newSpirit;
    }
    static createFromDataObject(obj: any): Spirit {
        let newSpirit = new Spirit();

        newSpirit.setNextId();
        newSpirit.type = obj.name || obj.type;
        newSpirit.name = obj.critternam || '';
        newSpirit.services = toInt(obj.services);
        newSpirit.force = toInt(obj.force);
        newSpirit.bound = toBool(obj.bound);
        newSpirit.created = toBool(obj.created);
        newSpirit.optionalPowers = obj.optionalPowers || [];
        newSpirit.plane = obj.plane || 'heimat';
        newSpirit.spentEdge = toInt(obj.spentEdge);

        return newSpirit;
    }
}

export type SpiritPower = {
    name: string;
    type: string;
    action: string;
    range: string;
    duration: string;
    pool: number;
    description: string;
    hasPool: boolean;
}

export function powerHasPool(power: SpiritPower): boolean {
    return power.hasPool;
}

export function isWatcher(type: SpiritType | null): boolean {
    return (type?.english_name ?? '') === 'Watcher';
}

export type Modifier = {
    name: string;
    value: number;
}

export function getSpiritPower(name: string): SpiritPower | null {
    return SpiritPowers.find((item: SpiritPower) => item.name === name) ?? null;
}

export const SpiritPowers: SpiritPower[] =  [
    {
        name: 'Astrale Gestalt',
        type: 'M',
        action: 'Auto',
        range: 'Selbst',
        duration: 'Immer',
        pool: 0,
        hasPool: false,
        description: 'Der Critter existiert nur auf der Astralebene. Er kann nicht von physischen Angriffen oder physischen Zaubersprüchen geschädigt werden, nur astrale Angriffe oder Manazauber können ihn verletzen. Ebenso kann ein astraler Critter keine Kreaturen in der physischen Welt beeinflussen, es sei denn, diese sind Dualwesen oder haben astrale Wahrnehmung aktiviert. Critter mit dieser Kraft können sich auf der physischen Ebene auf dieselbe Weise manifestieren wie astral projizierende Zauberer (siehe Seite 227).',
    },
    {
        name: 'Bewegung',
        type: 'P',
        action: 'Komplex',
        range: 'BF',
        duration: 'Aufrechterhalten',
        pool: 0,
        hasPool: false,
        description: 'Der Critter kann die Bewegungsrate des Ziels innerhalb des von ihm kontrollierten Gebiets erhöhen oder senken. Multiplizieren oder dividieren Sie die Bewegungsrate des Ziels mit der Magiestufe des Critters. Diese Kraft unterliegt Einschränkungen: Wenn die Konstitution des Ziels größer ist als die Magiestufe des Critters, ist die Kraft nur halb so effektiv (Multiplikation/Division der Bewegungsrate des Ziels nur mit der halben Magiestufe). Sollte die Konstitution des Ziels höher sein als die doppelte Magiestufe des Critters, versagt die Kraft.',
    },
    {
        name: 'Bewusstsein',
        type: 'P',
        action: 'Auto',
        range: 'Selbst',
        duration: 'Immer',
        pool: 0,
        hasPool: false,
        description: 'Critter mit Bewusstsein sind sich ihrer selbst bewusst und können entsprechende Entscheidungen treffen. Sie werden als Ungeübt (siehe S. 145) in allen Fertigkeiten eingestuft, die sie nicht besitzen, und können normale Proben ohne Fertigkeitswert durchführen. Critter mit Bewusstsein sind außerdem in der Lage, neue Fertigkeiten zu erlernen. Während die meisten Critter mit Bewusstsein mundan sind, gibt es unter ihnen auch einige, die Erwacht sind und ein Magieattribut besitzen. Erwachte Critter mit Bewusstsein können alle magischen Aufgaben ausführen und folgen denselben Regeln für Magie wie normale Erwachte Charaktere. Man weiß noch nicht, ob Critter mit Bewusstsein Technomancer werden können.',
    },
    {
        name: 'Bindung',
        type: 'P',
        action: 'Komplex',
        range: 'BF',
        duration: 'Sofort',
        pool: 0,
        hasPool: true,
        description: 'Der Critter kann bewirken, dass sein Opfer an jeder Oberfläche „festklebt“, die es berührt (oder an ihm selbst). Das Opfer kann versuchen, sich mit einer Komplexen Handlung zu befreien und eine Vergleichende Probe auf Stärke + Konstitution gegen Magie + Willenskraft des Critters ablegen. Gewinnt das Opfer, so kann es schließlich entkommen.',
    },
    {
        name: 'Einfluss',
        type: 'M',
        action: 'Komplex',
        range: 'BF',
        duration: 'Sofort',
        pool: 0,
        hasPool: true,
        description: 'Diese Kraft erlaubt es einem Wesen, Suggestionen in den Geist eines Ziels zu projizieren und diese Person zu einer Handlung, Reaktion oder Emotion zu veranlassen. Legen Sie eine Vergleichende Probe zwischen Magie + Charisma des Wesens und der Willenskraft des Ziels ab. Gelingt die Probe, führt das Ziel die Suggestion aus. Wird ihm aufgezeigt, dass seine Handlung falsch ist, darf das Opfer eine Willenskraftsprobe ablegen, um die Kontrolle abzuschütteln, wie unter Beherrschungsmanipulationen auf S. 244) beschrieben.',
    },
    {
        name: 'Elementarer Angriff',
        type: 'P',
        action: 'Komplex',
        range: 'BF',
        duration: 'Sofort',
        pool: 0,
        hasPool: false,
        description: 'Ein Critter mit elementarem Angriff kann eine zielgerichtete Explosion oder Welle von Schaden oder negativer Energie freisetzen, sei es Feuer, Eiseskälte, Elektrizität usw. Die Kraft wird wie ein Fernkampfangriff behandelt (siehe Fernkampf, S. 179), der Critter attackiert mit Exotische Fernkampfwaffe + Geschicklichkeit. Der Schadenscode ist gleich der Magie des Critters und wird als Kälte-, Elektrizitäts- oder Feuerschaden behandelt (siehe S. 193 – 195), passend zur Art des Angriffs. Stoßpanzerung schützt mit ihrer halben Stufe (aufgerundet). Die Art eines Elementaren Angriffs, die von einem Geist benutzt wird, entspricht seinem Element und wird bei seiner Beschwörung ausgewählt; einmal festgelegt, kann sie nicht mehr geändert werden',
    },
    {
        name: 'Energieaura',
        type: 'P',
        action: 'Auto',
        range: 'Selbst',
        duration: 'Immer',
        pool: 0,
        hasPool: false,
        description: 'Ein Critter mit Energieaura strahlt ständig eine Aura von schädlicher oder negativer Energie aus, zum Beispiel Feuer, Eiseskälte, Elektrizität oder etwas ähnliches. Nahkampfangriffe des Critters erhalten einen Bonus von +4 auf den Schadenscode und der Schaden wird als Kälte-, Elektrizitäts- oder Feuerschaden (siehe S. 193 – 195) behandelt, passend zur Aura. Stoßpanzerung schützt mit halber Stufe (aufgerundet). Ein erfolgreicher Nahkampfangriff gegen einen Critter mit Energieaura schädigt auch den Angreifer. Daher muss der Angreifer eine Schadenswiderstandsprobe gegen die Schadensart der Energieaura ablegen – der Schadenscode entspricht dem Magiewert des Critters. Auch hier schützt Stoßpanzerung mit halber Stufe (aufgerundet).',
    },
    {
        name: 'Gesteigerte Sinne IR-RL',
        type: 'P',
        action: 'Auto',
        range: 'Selbst',
        duration: 'Immer',
        pool: 0,
        hasPool: false,
        description: 'Infrarotsicht und Restlichtverstärkung - Gesteigerte Sinne umfassen alle vorstellbaren Sinneswahrnehmungen, die über die des Menschen hinausgehen, darunter Restlichtverstärkung und Infrarotsicht, verbessertes Gehör und Geruch, Organe zur Wärmewahrnehmung, natürliches Sonar usw.',
    },
    {
        name: 'Gesteigerte Sinne G-G-RL',
        type: 'P',
        action: 'Auto',
        range: 'Selbst',
        duration: 'Immer',
        pool: 0,
        hasPool: false,
        description: 'Geruch, Gehör und Restlichtverstärkung - Gesteigerte Sinne umfassen alle vorstellbaren Sinneswahrnehmungen, die über die des Menschen hinausgehen, darunter Restlichtverstärkung und Infrarotsicht, verbessertes Gehör und Geruch, Organe zur Wärmewahrnehmung, natürliches Sonar usw.',
    },
    {
        name: 'Gift',
        type: 'P',
        action: 'Auto',
        range: 'B',
        duration: 'Sofort',
        pool: 0,
        hasPool: false,
        description: 'Der Critter sondert ein natürliches Gift ab, das für Charaktere und andere Critter giftig ist. Behandeln Sie es als Toxin (siehe S. 296) mit den folgenden Attributen: Vektor: Injektion, Geschwindigkeit: 1 Kampfrunde, Kraft: 6, Wirkung: Körperlicher Schaden. Beachten Sie, dass einige Critter Gifte mit abweichenden Attributen besitzen, wie bei ihren individuellen Beschreibungen angegeben',
    },
    {
        name: 'Grauen',
        type: 'M',
        action: 'Komplex',
        range: 'BF',
        duration: 'Speziell',
        pool: 0,
        hasPool: true,
        description: 'Diese Kraft verleiht einem Wesen die Macht, seinen Opfern überwältigende Furcht einzuflößen. Das Opfer wird in Panik bis zum nächstgelegenen, sicher aussehenden Ort rennen und nicht stehenbleiben, bis es außer Sichtweite ist und eine sichere Entfernung zurückgelegt hat. Der Critter legt eine Vergleichende Probe auf Willenskraft + Magie gegen die Willenskraft des Opfers ab. Die Furcht dauert pro Nettoerfolg des Critters 1 Kampfrunde an, und selbst danach muss dem Ziel eine Willenskraft + Charisma (Nettoerfolge des Critters)-Probe gelingen, um zu dem Critter zurückzugehen und sich ihm zu stellen.',
    },
    {
        name: 'Materialisierung',
        type: 'P',
        action: 'Komplex',
        range: 'Selbst',
        duration: 'Aufrechterhalten',
        pool: 0,
        hasPool: false,
        description: 'Bestimmte astrale Critter sind in der Lage, sich selbst in die materielle Welt zu projizieren und dadurch mit physischen Wesen und Dingen zu interagieren. Im materialisierten Zustand können sie auf physische Ziele einwirken. Zusätzlich erhalten materialisierte Critter die Kraft "Immunität gegen normale Waffen" (S. 339).',
    },
    {
        name: 'Natürliche Waffen',
        type: 'P',
        action: 'Komplex',
        range: 'B',
        duration: 'Sofort',
        pool: 0,
        hasPool: false,
        description: '(Schaden = (Kraft) K, PB 0). Der Critter besitzt eine natürliche Form der Bewaffnung, die Körperlichen Schaden anrichten kann, wie zum Beispiel Klauen, scharfe Zähne oder einen Stachel. Die Beschreibung dieser Kraft umfasst die Art des Angriffs sowie ihren Schadenscode und Panzerbrech-Wert. Natürliche Waffen können entweder Nah- oder Fernkampfwaffen sein und Critter folgen bei ihrem Einsatz den Standardkampfregeln. Critter benutzen die Fertigkeit Waffenloser Kampf, wenn sie mit natürlichen Nahkampfwaffen angreifen, und die Fertigkeit Exotische Fernkampfwaffe, wenn sie mit natürlichen Fernkampfwaffen angreifen. Critter ohne Natürliche Waffe können trotzdem waffenlose Angriffe durchführen. Wie bei regulären Charakteren beträgt der Schaden dann [Stärke ÷ 2]G. Wenn der Critter ein Dualwesen ist, kann die Kraft Natürliche Waffe genutzt werden, um Angriffe gegen astrale Gegner in Reichweite durchzuführen (Fertigkeit Waffenloser Kampf und physischer Schadenscode werden normal verwendet).',
    },
    {
        name: 'Natürlicher Zauberspruch',
        type: 'wie Zauber',
        action: 'Komplex',
        range: 'wie Zauber',
        duration: 'wie Zauber',
        pool: 0,
        hasPool: true,
        description: 'Eine Kreatur mit einem natürlichen Zauberspruch besitzt die instinktive Fähigkeit, einen Spruch zu wirken. Der Critter muss die Fertigkeit Spruchzauberei besitzen, um die Kraft effektiv einzusetzen. Natürliche Zaubersprüche, die von einem Critter gewirkt werden, funktionieren genauso wie normale Zaubersprüche, und Zauberer können wie gewohnt Antimagie dagegen einsetzen. Natürliche Zaubersprüche verursachen den üblichen Entzug. Critter und Geister legen die Entzugswiderstandsprobe entweder mit Intuition oder Charisma ab (Entscheidung des Spielleiters)',
    },
    {
        name: 'Psychokinese',
        type: 'P',
        action: 'Komplex',
        range: 'BF',
        duration: 'Ausrechterhalten',
        pool: 0,
        hasPool: true,
        description: 'Ein Wesen mit Psychokinese kann eine psychokinetische Kraft mit einer Stärke und Geschicklichkeit gleich den Erfolgen aus einer Magie + Willenskraft-Probe erzeugen, ähnlich dem Spruch Zauberfinger (S. 246).',
    },
    {
        name: 'Schutz',
        type: 'P',
        action: 'Komplex',
        range: 'BF',
        duration: 'Aufrechterhalten',
        pool: 0,
        hasPool: false,
        description: 'Diese Kraft verleiht dem Critter die Fähigkeit, gewöhnliche umweltbedingte Unfälle und Gefahren (sowohl natürliche als auch solche, die von der Kraft Unfall verursacht wurden) abzuwenden, wie zum Beispiel jemanden vor einem Hitzschlag zu bewahren oder vor dem Ertrinken zu retten. Die Schutzkraft kann außerdem genutzt werden, um den unangenehmen Folgen eines Patzers zu entgehen. Schutz kann gleichzeitig auf eine Anzahl von Charakteren gleich dem Magieattribut des Critters angewendet werden.',
    },
    {
        name: 'Suche',
        type: 'P',
        action: 'Komplex',
        range: 'Speziell',
        duration: 'Speziell',
        pool: 0,
        hasPool: true,
        description: 'Das Wesen kann nach Personen, Orten oder Objekten suchen. Um das Ziel zu finden, wird eine Ausgedehnte Probe auf Magie + Intuition (5, 10 Minuten) abgelegt. Es gelten die Modifikatoren aus der Tabelle Suchmodikatoren (S. 341). Der Critter muss das Ziel, nach dem er sucht, vorher schon einmal gesehen haben; Geister können nach allem suchen, von dem ihnen ihr Beschwörer ein geistiges Bild übermittelt. Critter mit der Kraft Astrale Gestalt können die Suche im Astralraum durchführen und müssen sich nicht materialisieren, während sie suchen.',
    },
    {
        name: 'Tierbeherrschung',
        type: 'M',
        action: 'Komplex',
        range: 'BF',
        duration: 'Aufrechterhalten',
        pool: 0,
        hasPool: false,
        description: 'Manche Wesen können bestimmte mundane Tiere geistig manipulieren. Diese Kraft erlaubt es dem Wesen, das Verhalten eines Tieres oder einer Gruppe von Tieren zu lenken. Dieses Verhalten muss sich innerhalb dessen abspielen, was für das Tier normal ist. Ein beherrschter Affe könnte beispielsweise nicht Auto fahren, aber er könnte angewiesen werden, auf einen Baum zu klettern, einen Gegenstand zu holen, anzugreifen, still zu sitzen oder jemandem zu folgen. Tiere, die das Blickfeld verlassen, können nicht mehr kontrolliert werden, aber sie werden weiterhin alle Befehle ausführen, die sie erhalten haben. Das Wesen kann eine Anzahl kleinerer Tiere (Katzen, Ratten usw.) gleich seinem Charisma x 5 oder eine Anzahl größerer Tiere (Wölfe, Löwen, Bären usw.) gleich seinem Charisma kontrollieren. Diese Kraft kann nicht auf Critter angewendet werden, die über die Kraft Bewusstsein oder ein Magieattribut verfügen.',
    },
    {
        name: 'Übler Atem',
        type: 'P',
        action: 'Komplex',
        range: 'Speziell',
        duration: 'Sofort',
        pool: 0,
        hasPool: false,
        description: 'Der Critter kann einen Übelkeit erregenden Gestank verbreiten, um seine Opfer außer Gefecht zu setzen. Behandeln Sie dies als einen Angriff mit einem inhalierten Toxin (Geschwindigkeit: Sofort, Kraft : Magiestufe des Critters, Wirkung: Geistiger Schaden, Übelkeit; siehe S. 297). Panzerung hilft nicht beim Widerstand gegen diesen Schaden, nur Atemschutz hilft (siehe Tabelle Schutz vor Toxinen, S. 296). Der Atemstoß breitet sich kegelförmig bis zu (Konstitution) Metern aus und kann bis zu 2 Ziele treffen, die höchstens 1 Meter voneinander entfernt sind',
    },
    {
        name: 'Unfall',
        type: 'P',
        action: 'Komplex',
        range: 'BF',
        duration: 'Sofort',
        pool: 0,
        hasPool: true,
        description: 'Diese Kraft erlaubt es dem Wesen, scheinbar normale Unfälle zu verursachen. Die genaue Art des Unfalls bleibt dem Spielleiter überlassen, basierend auf den Umständen und der Umgebung. Wenn ein Charakter Ziel der Kraft Unfall wird, legen Sie eine Vergleichende Probe zwischen Magie + Willenskraft des Critters und Intuition + Reaktion des Charakters ab. Gewinnt der Critter, erleidet der Charakter einen Unfall, der vom Spielleiter bestimmt wird. Möglichkeiten dafür sind: Er stolpert, bekommt den Mund voll Blätter, stößt sich schmerzhaft sein Knie, lässt etwas fallen oder hat einen geistigen Aussetzer und wirft den Ladestreifen seiner Waffe aus. Der Unfall selbst ist nicht gefährlich, doch die Umwelt kann ihn gefährlich machen. Auf einem schmalen Gebirgspfad auszurutschen kann zum Beispiel sehr unvorteilhaft sein. Wenn der Critter 4 oder mehr Nettoerfolge erzielt, behandeln Sie den Unfall als Kritischen Patzer – der Unfall ist nicht nur ein Ausrutscher, sondern ein schlimmes Missgeschick. Wenn ein Critter Unfall gegen ein Fahrzeug einsetzt, zwingt er den Fahrer, eine Fahrzeugrobe abzulegen. Das Magieattribut des Critters dient dabei als negativer Würfelpool-Modifikator auf die Probe',
    },
    {
        name: 'Verschleierung',
        type: 'P',
        action: 'Einfach',
        range: 'BF',
        duration: 'Aufrechterhalten',
        pool: 0,
        hasPool: false,
        description: 'Diese Kraft bezieht sich auf die Fähigkeit eines Critters, sich selbst auf geheimnisvolle Weise vor anderen zu verbergen oder alternativ etwas zu verbergen, wonach andere suchen. Verschleierung zieht eine Anzahl Würfel gleich der Magiestufe des Critters von allen Proben ab, um das verschleierte Subjekt zu finden. Verschleierung kann gleichzeitig auf eine Anzahl von Zielen gleich der Magiestufe des Critters angewandt werden. Die Verschleierten können sich gegenseitig sehen, wenn der Critter dies erlaubt. Verschleierung erlaubt es Dualwesen, sich und andere vor astraler Entdeckung zu schützen.',
    },
    {
        name: 'Verschlingen (Feuer)',
        type: 'P',
        action: 'Komplex',
        range: 'B',
        duration: 'Aufrechterhalten',
        pool: 0,
        hasPool: true,
        description: 'Diese Kraft verleiht einem Critter die Fähigkeit, Opfer in sich oder in von ihm beherrschtes Gelände hineinzusaugen und damit zu ersticken. Behandeln Sie Verschlingen wie einen Nahkampfangriff. Wenn der Angriff gelingt, richtet er Schaden an (siehe unten) und der Critter verschlingt das Opfer. Jedesmal, wenn die Kampfphase des Critters an der Reihe ist, richtet der Critter automatisch Schaden mit einem Grundschadenscode gleich  seinem Magieattribut an. Nettoerfolge des anfänglichen Nahkampfangriffs erhöhen den Schadenscode. Das Opfer widersteht dem Schaden normal mit einer Schadenswiderstandsprobe, wobei es Konstitution + halbe Stoßpanzerung (aufgerundet) verwendet, wenn nicht anders vermerkt Verschlungene Opfer können sich nicht bewegen. Während der Kampfphase des Opfers kann dieses versuchen, zu entkommen. Legen Sie eine Vergleichende Probe zwischen Stärke + Konstitution des Opfers und Magie + Konstitution des Critters ab. Gewinnt das Opfer, dann ist ihm die Flucht gelungen und es gilt nicht mehr als verschlungen. Sekundärer Effekt: Verschlingen durch Feuer: Das Opfer muss Feuerschaden widerstehen (siehe S. 194).',
    },
    {
        name: 'Verschlingen (Wasser)',
        type: 'P',
        action: 'Komplex',
        range: 'B',
        duration: 'Aufrechterhalten',
        pool: 0,
        hasPool: true,
        description:
            `Diese Kraft verleiht einem Critter die Fähigkeit, Opfer in sich oder in von ihm beherrschtes Gelände hineinzusaugen und damit zu ersticken.
            Behandeln Sie Verschlingen wie einen Nahkampfangriff. Wenn der Angriff gelingt, richtet er Schaden an (siehe unten) und der Critter verschlingt das Opfer. 
            Jedesmal, wenn die Kampfphase des Critters an der Reihe ist, richtet der Critter automatisch Schaden mit einem Grundschadenscode gleich  seinem Magieattribut an. 
            Nettoerfolge des anfänglichen Nahkampfangriffs erhöhen den Schadenscode. Das Opfer widersteht dem Schaden normal mit einer Schadenswiderstandsprobe, wobei es Konstitution + halbe Stoßpanzerung (aufgerundet) verwendet, 
            wenn nicht anders vermerkt Verschlungene Opfer können sich nicht bewegen. Während der Kampfphase des Opfers kann dieses versuchen, zu entkommen. 
            Legen Sie eine Vergleichende Probe zwischen Stärke + Konstitution des Opfers und Magie + Konstitution des Critters ab. Gewinnt das Opfer, dann ist ihm die Flucht gelungen und es gilt nicht mehr als verschlungen. 
            Sekundärer Effekt: Verschlingen durch Wasser: Das Opfer muss Geistigem Schaden widerstehen. Dies ist härter als normales Ertrinken, da der Critter extremen Druck auf das Opfer ausübt. 
            Opfer, die durch den Geistigen Schaden bewusstlos werden, erleiden weiterhin Schaden, wobei der Geistige Schaden wie üblich in den Körperlichen übergeht.`,
    },
    {
        name: 'Verschlingen (Luft)',
        type: 'P',
        action: 'Komplex',
        range: 'B',
        duration: 'Aufrechterhalten',
        pool: 0,
        hasPool: true,
        description: 'Diese Kraft verleiht einem Critter die Fähigkeit, Opfer in sich oder in von ihm beherrschtes Gelände hineinzusaugen und damit zu ersticken. Behandeln Sie Verschlingen wie einen Nahkampfangriff. Wenn der Angriff gelingt, richtet er Schaden an (siehe unten) und der Critter verschlingt das Opfer. Jedesmal, wenn die Kampfphase des Critters an der Reihe ist, richtet der Critter automatisch Schaden mit einem Grundschadenscode gleich  seinem Magieattribut an. Nettoerfolge des anfänglichen Nahkampfangriffs erhöhen den Schadenscode. Das Opfer widersteht dem Schaden normal mit einer Schadenswiderstandsprobe, wobei es Konstitution + halbe Stoßpanzerung (aufgerundet) verwendet, wenn nicht anders vermerkt Verschlungene Opfer können sich nicht bewegen. Während der Kampfphase des Opfers kann dieses versuchen, zu entkommen. Legen Sie eine Vergleichende Probe zwischen Stärke + Konstitution des Opfers und Magie + Konstitution des Critters ab. Gewinnt das Opfer, dann ist ihm die Flucht gelungen und es gilt nicht mehr als verschlungen. Sekundärer Effekt: Verschlingen durch Luft: Das Opfer muss Geistigem Schaden wie von einem inhalierten Toxin widerstehen (siehe S. 296). Panzerung schützt nicht gegen diesen Angriff, andere Schutzausrüstung jedoch schon (siehe die Tabelle Schutz vor Toxinen, S. 296). Wenn das Opfer vom Geistigen Schaden bewusstlos wird, wird weiterhin Schaden angerichtet, wobei der Geistige Schaden wie üblich in den Körperlichenübergeht.',
    },
    {
        name: 'Verschlingen (Erde)',
        type: 'P',
        action: 'Komplex',
        range: 'B',
        duration: 'Aufrechterhalten',
        pool: 0,
        hasPool: true,
        description: 'Diese Kraft verleiht einem Critter die Fähigkeit, Opfer in sich oder in von ihm beherrschtes Gelände hineinzusaugen und damit zu ersticken. Behandeln Sie Verschlingen wie einen Nahkampfangriff. Wenn der Angriff gelingt, richtet er Schaden an (siehe unten) und der Critter verschlingt das Opfer. Jedesmal, wenn die Kampfphase des Critters an der Reihe ist, richtet der Critter automatisch Schaden mit einem Grundschadenscode gleich  seinem Magieattribut an. Nettoerfolge des anfänglichen Nahkampfangriffs erhöhen den Schadenscode. Das Opfer widersteht dem Schaden normal mit einer Schadenswiderstandsprobe, wobei es Konstitution + halbe Stoßpanzerung (aufgerundet) verwendet, wenn nicht anders vermerkt Verschlungene Opfer können sich nicht bewegen. Während der Kampfphase des Opfers kann dieses versuchen, zu entkommen. Legen Sie eine Vergleichende Probe zwischen Stärke + Konstitution des Opfers und Magie + Konstitution des Critters ab. Gewinnt das Opfer, dann ist ihm die Flucht gelungen und es gilt nicht mehr als verschlungen. Sekundärer Effekt: Verschlingen durch Erde: Das Opfer muss Körperlichem Schaden widerstehen.',
    },
    {
        name: 'Verwirrung',
        type: 'M',
        action: 'Komplex',
        range: 'BF',
        duration: 'Aufrechterhalten\n',
        pool: 0,
        hasPool: true,
        description: 'Die Kraft Verwirrung erlaubt es einem Critter, ein Ziel zu verwirren, sodass es unfähig ist, Entscheidungen zu treffen, seinen Orientierungssinn verliert, sich nicht mehr erinnert, was es gerade tun wollte, usw. Der Critter legt eine Vergleichende Probe auf Magie + Willenskraft gegen die Willenskraft des Ziels ab. Die vom Critter erzielten Nettoerfolge dienen als negativer Würfelpool-Modifikator für alle Handlungen, die das Ziel unternimmt.',
    },
    {
        name: 'Wetterbeherrschung',
        type: 'P',
        action: 'Komplex',
        range: 'BF',
        duration: 'Aufrechterhalten',
        pool: 0,
        hasPool: true,
        description: 'Die Kra Wetterbeherrschung erlaubt es einem Critter, bestimmte Wetterbedingungen zu erzeugen. Das gewünschte Wetter muss in der Umgebung möglich sein, in der die Kraft eingesetzt wird (zum Beispiel keine Schneestürme im Death Valley oder Hitzewellen in Island). Die Wetteränderung baut sich allmählich auf und erreicht ihren Höhepunkt, sobald der Critter eine Ausgedehnte Probe auf Magie + Willenskraft (10, 30 Minuten) absolviert hat. Die Kreatur ruft das gewünschte Wetter nur herbei, sie kann es nicht kontrollieren. Eine Kreatur, die ein Gewitter beschwört, kann also beispielsweise nicht bestimmen, wo die Blitze einschlagen',
    },

]

export function optionalPowersFor(type: string): SpiritPower[] {
    const spiritType = SpiritTypes.find((item: SpiritType) => { return item.name === type }) ?? null;
    const powersAsStringArray =  toArray(spiritType?.optional ?? null);
    return powersAsStringArrayToPowers(powersAsStringArray);
}

function powersAsStringArrayToPowers(powersAsStringArray: string[]): SpiritPower[] {
    const powers = [];

    for (const powerAsString of powersAsStringArray)
    {
        const power = getSpiritPower(powerAsString);
        if (power !== null)
        {
            powers.push({ ...power, pool: 5 });
        }
        else
        {
            console.error('SpiritPower not found: ' + powerAsString)
        }
    }
    return powers;
}

export const SpiritTypes : SpiritType[] = [
    {
        name: 'Erdgeist',
        english_name: 'Spirit of Earth',
        modifiers: [
            {name: 'BOD', value:  4},
            {name: 'AGI', value: -2},
            {name: 'REA', value:  2},
            {name: 'STR', value:  4},
            {name: 'INI', value:  2},
        ],
        movement: '10/25',
        skills: 'Askennen, Astralkampf, Ausweichen, Exotische Fernkampfwaffe, Waffenloser Kampf, Wahrnehmung',
        powers: 'Astrale Gestalt, Bewegung, Bewusstsein, Bindung, Materialisierung, Schutz, Suche',
        optional: 'Elementarer Angriff, Grauen, Verschleierung, Verschlingen (Erde), Verwirrung',
        flaws: 'keine Allergien',
    },
    {
        name: 'Feuergeist',
        english_name: 'Spirit of Fire',
        modifiers: [
            {name: 'BOD', value:  1},
            {name: 'AGI', value:  2},
            {name: 'REA', value:  3},
            {name: 'STR', value: -2},
            {name: 'INI', value:  3},
        ],
        movement: '15/40 (fliegend)',
        skills: 'Askennen, Astralkampf, Ausweichen, Exotische Fernkampfwaffe, Fliegen, Waffenloser Kampf, Wahrnehmung',
        powers: 'Astrale Gestalt, Bewusstsein, Elementarer Angriff, Energieaura, Materialisierung, Unfall, Verschlingen (Feuer), Verwirrung',
        optional: 'Grauen, Schutz, Suche, Übler Atem',
        flaws: 'Allergie (Wasser, Schwer)',
    },
    {
        name: 'Luftgeist',
        english_name: 'Spirit of Air',
        modifiers: [
            {name: 'BOD', value: -2},
            {name: 'AGI', value:  3},
            {name: 'REA', value:  4},
            {name: 'STR', value: -3},
            {name: 'INI', value:  4},
        ],
        movement: '15/75 (fliegend)',
        skills: 'Askennen, Astralkampf, Ausweichen, Exotische Fernkampfwaffe, Fliegen, Waffenloser Kampf, Wahrnehmung',
        powers: 'Astrale Gestalt, Bewegung, Bewusstsein, Materialisierung, Suche, Unfall, Verschleierung, Verschlingen (Luft), Verwirrung',
        optional: 'Elementarer Angriff , Energieaura, Grauen, Psychokinese, Schutz, Übler Atem',
        flaws: 'keine Allergien',
    },
    {
        name: 'Wassergeist',
        english_name: 'Spirit of Water',
        modifiers: [
            {name: 'BOD', value:  2},
            {name: 'AGI', value:  0},
            {name: 'REA', value:  2},
            {name: 'STR', value:  0},
            {name: 'INI', value:  0},
        ],
        movement: '10/25 (30/75 schwimmend)',
        skills: 'Askennen, Astralkampf, Ausweichen, Exotische Fernkampfwaffe, Waffenloser Kampf, Wahrnehmung',
        powers: 'Astrale Gestalt, Bewegung, Bewusstsein, Materialisierung, Suche, Verschleierung, Verschlingen (Wasser), Verwirrung',
        optional: 'Bindung, Elementarer Angriff, Energieaura, Schutz, Unfall, Wetterbeherrschung',
        flaws: 'Allergie (Feuer, Schwer)',
    },
    {
        name: 'Geist der Menschen',
        english_name: 'Spirit of Man',
        modifiers: [
            {name: 'BOD', value:  1},
            {name: 'AGI', value:  0},
            {name: 'REA', value:  2},
            {name: 'STR', value: -2},
            {name: 'INI', value:  2},
        ],
        movement: '10/25',
        skills: 'Askennen, Astralkampf, Ausweichen, Spruchzauberei, Waffenloser Kampf, Wahrnehmung',
        powers: 'Astrale Gestalt, Bewusstsein, Einfluss, Gesteigerte Sinne IR-RL, Schutz, Suche, Unfall, Materialisierung, Verschleierung, Verwirrung',
        optional: 'Bewegung, Grauen, Natürlicher Zauberspruch, Psychokinese',
        flaws: 'keine Allergien',
    },
    {
        name: 'Geist der Tiere',
        english_name: 'Spirit of Animal',
        modifiers: [
            {name: 'BOD', value:  2},
            {name: 'AGI', value:  1},
            {name: 'REA', value:  2},
            {name: 'STR', value:  2},
            {name: 'INI', value:  2},
        ],
        movement: '10/45',
        skills: 'Askennen, Astralkampf, Ausweichen, Waffenloser Kampf, Wahrnehmung',
        powers: 'Astrale Gestalt, Bewegung, Bewusstsein,Gesteigerte Sinne G-G-RL, Grauen, Materialisierung, Tierbeherrschung',
        optional: 'Gift, Natürliche Waffen, Verschleierung, Verwirrung, Schutz, Suche, Übler Atem',
        flaws: 'keine Allergien',
    },
    {
        name: 'Watcher',
        english_name: 'Watcher',
        modifiers: [
            {name: 'BOD', value:  0},
            {name: 'AGI', value:  0},
            {name: 'REA', value:  0},
            {name: 'STR', value:  0},
            {name: 'EDG', value: -1},
            {name: 'INI', value:  0},
        ],
        movement: '-',
        skills: 'Askennen, Astralkampf, Ausweichen',
        powers: 'Astrale Gestalt, Suche',
        optional: '',
        flaws: 'Watcher existieren nur auf der Astralebene (obwohl sie sich auf der physischen Ebene manifestieren können). Ihre Kraftstufe beträgt immer 1.',
    },

];
