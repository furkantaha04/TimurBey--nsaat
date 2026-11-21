/**
 * ProjectModel - Proje Verileri
 * MVC Model Katmanı
 */
class ProjectModel {
    constructor() {
        this.projects = [
            {
                id: 0,
                name: 'Timur Tower',
                category: 'Ticari',
                location: 'İstanbul',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=450&fit=crop',
                link: 'proje-detay.html'
            },
            {
                id: 1,
                name: 'Golden Residence',
                category: 'Lüks Konut',
                location: 'Ankara',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop',
                link: 'golden-residence.html'
            },
            {
                id: 2,
                name: 'Marina Premium',
                category: 'Rezidans',
                location: 'İzmir',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=450&fit=crop',
                link: 'marina-premium.html'
            },
            {
                id: 3,
                name: 'Endüstri Merkezi',
                category: 'Endüstriyel',
                location: 'Bursa',
                image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&h=450&fit=crop',
                link: 'endustri-merkezi.html'
            },
            {
                id: 4,
                name: 'Elit Konakları',
                category: 'Villa',
                location: 'Antalya',
                image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=450&fit=crop',
                link: 'elit-konaklari.html'
            },
            {
                id: 5,
                name: 'Business Park',
                category: 'Ofis',
                location: 'İstanbul',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=450&fit=crop',
                link: 'business-park.html'
            }
        ];
    }

    getAll() {
        return this.projects;
    }

    getById(id) {
        return this.projects.find(p => p.id === id);
    }

    getCount() {
        return this.projects.length;
    }
}

export default ProjectModel;
