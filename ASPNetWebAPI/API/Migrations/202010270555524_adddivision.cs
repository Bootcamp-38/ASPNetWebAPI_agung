namespace API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class adddivision : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tb_m_Department",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.tb_m_Division",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        DepartmentID = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.tb_m_Department", t => t.DepartmentID)
                .Index(t => t.DepartmentID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.tb_m_Division", "DepartmentID", "dbo.tb_m_Department");
            DropIndex("dbo.tb_m_Division", new[] { "DepartmentID" });
            DropTable("dbo.tb_m_Division");
            DropTable("dbo.tb_m_Department");
        }
    }
}
