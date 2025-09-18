// Request routing service for automatically assigning requests to the correct department
class RequestRoutingService {
  // Define keywords that map to departments
  static getDepartmentKeywords() {
    return {
      'Housekeeping': [
        'clean', 'towels', 'sheets', 'linens', 'room service', 'dirty', 
        'maid', 'housekeeping', 'bed', 'bathroom', 'amenities', 'pillow'
      ],
      'Maintenance': [
        'fix', 'broken', 'repair', 'leak', 'plumbing', 'electrical', 
        'ac', 'air conditioning', 'heating', 'hot water', 'tv', 'wifi',
        'internet', 'light', 'outlet', 'window', 'door', 'lock'
      ],
      'Food & Beverage': [
        'food', 'drink', 'meal', 'breakfast', 'lunch', 'dinner', 
        'room service', 'restaurant', 'bar', 'beverage', 'snack',
        'coffee', 'tea', 'water', 'wine', 'beer'
      ],
      'Front Desk': [
        'checkin', 'checkout', 'reservation', 'bill', 'payment', 
        'key', 'late checkout', 'early checkin', 'parking', 'baggage',
        'concierge', 'recommendation', 'tour', 'taxi'
      ]
    };
  }
  
  // Automatically determine the department for a request based on keywords
  static routeRequest(title, description = '') {
    const keywords = this.getDepartmentKeywords();
    const fullText = (title + ' ' + description).toLowerCase();
    
    // Check each department's keywords
    for (const [department, departmentKeywords] of Object.entries(keywords)) {
      for (const keyword of departmentKeywords) {
        if (fullText.includes(keyword)) {
          return department;
        }
      }
    }
    
    // Default to Front Desk if no keywords match
    return 'Front Desk';
  }
  
  // Get priority level based on keywords
  static getPriority(title, description = '') {
    const fullText = (title + ' ' + description).toLowerCase();
    
    // Urgent keywords
    const urgentKeywords = [
      'emergency', 'urgent', 'immediately', 'asap', 'broken', 'leak', 
      'security', 'medical', 'help', 'stuck', 'locked out'
    ];
    
    // High priority keywords
    const highPriorityKeywords = [
      'soon', 'quick', 'fast', 'hurry', 'important', 'needed', 
      'dirty', 'clean', 'late', 'early'
    ];
    
    // Check for urgent keywords
    for (const keyword of urgentKeywords) {
      if (fullText.includes(keyword)) {
        return 'URGENT';
      }
    }
    
    // Check for high priority keywords
    for (const keyword of highPriorityKeywords) {
      if (fullText.includes(keyword)) {
        return 'HIGH';
      }
    }
    
    // Default to medium priority
    return 'MEDIUM';
  }
  
  // Get estimated response time in minutes based on department and priority
  static getEstimatedResponseTime(department, priority) {
    const responseTimes = {
      'URGENT': {
        'Maintenance': 15,
        'Housekeeping': 30,
        'Food & Beverage': 20,
        'Front Desk': 10
      },
      'HIGH': {
        'Maintenance': 60,
        'Housekeeping': 45,
        'Food & Beverage': 30,
        'Front Desk': 20
      },
      'MEDIUM': {
        'Maintenance': 120,
        'Housekeeping': 90,
        'Food & Beverage': 45,
        'Front Desk': 30
      },
      'LOW': {
        'Maintenance': 240,
        'Housekeeping': 120,
        'Food & Beverage': 60,
        'Front Desk': 45
      }
    };
    
    return responseTimes[priority][department] || 60;
  }
}

module.exports = RequestRoutingService;