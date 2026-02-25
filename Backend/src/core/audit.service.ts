class AuditService {

  static log(action: string, userId: string, metadata?: any) {
    console.log("📝 AUDIT LOG:", {
      action,
      userId,
      metadata,
      timestamp: new Date()
    });
  }
}

export default AuditService;