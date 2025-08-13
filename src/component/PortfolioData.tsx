export interface PortfolioImage {
    id: string
    url: string
    title: string
    description?: string
  }
  
  export interface PortfolioItem {
    id: string
    title: string
    description: string
    category: string
    coverImage: string
    images: PortfolioImage[]
    date: string
    location?: string
    client?: string
  }
  
  // Mock data - in a real app, this would come from a database
  export const portfolioData: PortfolioItem[] = [
    {
      id: '1',
      title: 'Elegant Portrait Session',
      description: 'Professional headshots and creative portraits',
      category: 'portrait',
      coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80',
      date: '2024-12-15',
      location: 'New York Studio',
      client: 'Sarah Mitchell',
      images: [
        {
          id: '1-1',
          url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80',
          title: 'Portrait 1',
          description: 'Professional headshot with natural lighting'
        },
        {
          id: '1-2',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80',
          title: 'Portrait 2',
          description: 'Creative angle with dramatic shadows'
        },
        {
          id: '1-3',
          url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80',
          title: 'Portrait 3',
          description: 'Artistic composition with bokeh background'
        },
        {
          id: '1-4',
          url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
          title: 'Portrait 4',
          description: 'Natural outdoor portrait'
        }
      ]
    },
    {
      id: '2',
      title: 'Romantic Wedding Ceremony',
      description: 'Beautiful outdoor wedding celebration',
      category: 'wedding',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      date: '2024-11-20',
      location: 'Central Park, NYC',
      client: 'Emma & James',
      images: [
        {
          id: '2-1',
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
          title: 'Ceremony',
          description: 'The magical moment of saying "I do"'
        },
        {
          id: '2-2',
          url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
          title: 'Reception',
          description: 'Dancing under the stars'
        },
        {
          id: '2-3',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          title: 'Couple Portraits',
          description: 'Intimate moments captured'
        },
        {
          id: '2-4',
          url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          title: 'Wedding Details',
          description: 'Beautiful floral arrangements'
        },
        {
          id: '2-5',
          url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          title: 'Family Photos',
          description: 'Celebrating with loved ones'
        }
      ]
    },
    {
      id: '3',
      title: 'Corporate Annual Event',
      description: 'Professional event photography',
      category: 'event',
      coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      date: '2024-10-10',
      location: 'Manhattan Conference Center',
      client: 'TechCorp Inc.',
      images: [
        {
          id: '3-1',
          url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          title: 'Conference',
          description: 'Keynote presentation moment'
        },
        {
          id: '3-2',
          url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
          title: 'Networking',
          description: 'Professional connections being made'
        },
        {
          id: '3-3',
          url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
          title: 'Team Meeting',
          description: 'Collaborative discussion session'
        }
      ]
    },
    {
      id: '4',
      title: 'Product Showcase',
      description: 'Commercial product photography',
      category: 'commercial',
      coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      date: '2024-09-05',
      location: 'Studio',
      client: 'Fashion Brand X',
      images: [
        {
          id: '4-1',
          url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          title: 'Product Display',
          description: 'Clean and professional product shots'
        },
        {
          id: '4-2',
          url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1226&q=80',
          title: 'Architecture',
          description: 'Modern building photography'
        },
        {
          id: '4-3',
          url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          title: 'Interior Design',
          description: 'Luxurious interior spaces'
        }
      ]
    }
  ]
  
  // Store management functions
  export class PortfolioStore {
    private static data: PortfolioItem[] = [...portfolioData]
  
    static getAll(): PortfolioItem[] {
      return this.data
    }
  
    static getByCategory(category: string): PortfolioItem[] {
      if (category === 'all') return this.data
      return this.data.filter(item => item.category === category)
    }
  
    static getById(id: string): PortfolioItem | undefined {
      return this.data.find(item => item.id === id)
    }
  
    static add(item: PortfolioItem): void {
      this.data.push(item)
    }
  
    static update(id: string, updates: Partial<PortfolioItem>): void {
      const index = this.data.findIndex(item => item.id === id)
      if (index !== -1) {
        this.data[index] = { ...this.data[index], ...updates }
      }
    }
  
    static delete(id: string): void {
      this.data = this.data.filter(item => item.id !== id)
    }
  }